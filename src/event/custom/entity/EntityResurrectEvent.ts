import {
    Entity,
    EntityDamageCause,
    EntityDamageSource,
    EquipmentSlot,
    Player,
    world,
    WorldBeforeEvents,
} from "@minecraft/server";
import EventSignal from "../EventSignal";

interface CachedEntity {
    nameTag: string;
    id: string;
    typeId: string;
}

const resurrectCallbacks: Array<(event: EntityResurrectBeforeEvent) => void> =
    [];

const EntityCache: Map<string, CachedEntity> = new Map();

/**
 * Parses the name of the entity that caused the damage.
 * @param name - The name of the entity.
 * @returns The formatted name of the killer entity.
 */
function parseKillerName(name: string): string {
    if (name == undefined) {
        return undefined;
    }
    let parsedName = name
        .replace(/.+?(:)/g, "")
        .replace(/_/g, " ")
        .replace(/(?<= )./g, (char: string) => char.toUpperCase())
        .replace(/§./g, "")
        .replace(/(\n).+/, "")
        .replace(/ V2/g, (replaceValue: string) =>
            name == "minecraft:zombie_villager_v2" ? "" : replaceValue,
        );
    return parsedName[0].toUpperCase() + parsedName.substring(1);
}

interface EntityResurrectEventSignal
    extends EventSignal<EntityResurrectBeforeEvent> {
    /**
     * Subscribes to the entity resurrection event.
     * @param callback - The callback function to be invoked when the event occurs.
     */
    subscribe(callback: (event: EntityResurrectBeforeEvent) => void): void;

    /**
     * Unsubscribes from the entity resurrection event.
     * @param callback - The callback function to be removed from the subscription list.
     */
    unsubscribe(callback: (event: EntityResurrectBeforeEvent) => void): void;

    /**
     * @private
     */
    triggerEvent(event: EntityResurrectBeforeEvent): void;
}

/**
 * Manages the subscription and unsubscription of entity resurrection events.
 */
class EntityResurrectEventSignal extends EventSignal<EntityResurrectBeforeEvent> {}

const entityResurrectEventSignal = new EntityResurrectEventSignal();

WorldBeforeEvents.prototype.entityResurrect = entityResurrectEventSignal;

world.beforeEvents.entityResurrect = entityResurrectEventSignal;

/**
 * Subscribes to the `entityHurt` event and processes the event to handle resurrection logic.
 */
world.afterEvents.entityHurt.subscribe((arg) => {
    try {
        const {
            hurtEntity: _player,
            damage: _damage,
            damageSource: _damageSource,
        } = arg;

        if (_damage > 0 || _damageSource.cause !== "none") {
            return;
        }

        const entityHurt = world.afterEvents.entityHurt;

        const data = entityHurt.subscribe((originalData) => {
            const { hurtEntity, damageSource, damage } = originalData;

            const player = hurtEntity as Player;

            let damagerWasValid = true;

            if (player.id != _player.id || damageSource.cause == "none") {
                return;
            }

            world.afterEvents.entityHurt.unsubscribe(data);

            //@ts-ignore
            let damagingEntity =
                damageSource.cause == "entityExplosion"
                    ? EntityCache.get(damageSource.damagingEntity?.id)
                    : damageSource.damagingEntity;

            const killer =
                (damagingEntity?.nameTag == ""
                    ? (damagingEntity as Player)?.name
                    : damagingEntity?.nameTag) ??
                parseKillerName(damagingEntity?.typeId);

            const mimicProjectile = damageSource.damagingProjectile
                ? damageSource.damagingEntity.dimension.spawnEntity(
                      damageSource.damagingProjectile?.typeId,
                      damageSource.damagingEntity.location,
                  )
                : undefined;

            const newCause =
                damageSource.cause != "projectile"
                    ? damageSource.cause
                    : mimicProjectile && damageSource.cause == "projectile"
                    ? EntityDamageCause.entityAttack
                    : EntityDamageCause.entityAttack;

            const newDamageSource: EntityDamageSource = {
                cause: newCause,
                damagingEntity: damageSource.damagingEntity,
                damagingProjectile: mimicProjectile,
            };

            const projectileComponent =
                mimicProjectile?.getComponent("projectile");

            if (mimicProjectile && projectileComponent) {
                projectileComponent.owner = damageSource.damagingEntity;
            }

            let cachedDamager;

            if (!damageSource.damagingEntity?.isValid()) {
                damagerWasValid = false;
                if (damageSource.cause == EntityDamageCause.entityExplosion) {
                    cachedDamager = EntityCache.get(
                        damageSource.damagingEntity.id,
                    );
                }
            }

            const eventData = new EntityResurrectBeforeEvent({
                hurtEntity: player,
                damage,
                damageSource: {
                    damagingEntity: damagerWasValid
                        ? damageSource.damagingEntity
                        : cachedDamager,
                    damagingProjectile: damageSource.damagingProjectile,
                    cause: damageSource.cause,
                },
            });

            world.beforeEvents.entityResurrect.triggerEvent(eventData);

            if (!eventData.cancel) {
                if (mimicProjectile) {
                    mimicProjectile.remove();
                }
                return;
            }

            const equipment = player.getComponent("equippable");

            const mainHand = equipment.getEquipmentSlot(EquipmentSlot.Mainhand);
            const offHand = equipment.getEquipmentSlot(EquipmentSlot.Offhand);

            const mainItem = mainHand.getItem();
            const offItem = offHand.getItem();

            if (mainHand.getItem()?.typeId == "minecraft:totem_of_undying") {
                if (!world.gameRules.keepInventory) {
                    player.dimension.spawnItem(mainItem, player.location);
                }
                mainHand.setItem();
            }

            if (offHand.getItem()?.typeId == "minecraft:totem_of_undying") {
                if (!world.gameRules.keepInventory) {
                    player.dimension.spawnItem(offItem, player.location);
                }
                offHand.setItem();
            }

            if (!damagerWasValid && damageSource.damagingEntity != undefined) {
                const damager = player.dimension.spawnEntity(
                    cachedDamager?.typeId,
                    player.location,
                );

                damager.addEffect("invisibility", 20000000);
                damager.nameTag = cachedDamager.nameTag;

                newDamageSource.damagingEntity = damager;
            }

            /**
             * Recursively applies damage to the player to force their death.
             */
            function forcePlayerDeath() {
                if (player.getComponent("health").currentValue > 0) {
                    player.applyDamage(99999, newDamageSource);
                    forcePlayerDeath();
                }
            }

            for (const effect of player.getEffects()) {
                player.removeEffect(effect?.typeId);
            }

            forcePlayerDeath();

            if (!damagerWasValid && damageSource.damagingEntity != undefined) {
                newDamageSource.damagingEntity?.remove();
            }
            if (mimicProjectile) {
                mimicProjectile.remove();
            }
            if (world.gameRules.keepInventory) {
                mainHand.setItem(mainItem);
                offHand.setItem(offItem);
            }
        });
    } catch (error) {
        LOGGER.error(error);
    }
});

/**
 * Represents an event that is triggered when an entity is about to be resurrected with a totem of undying.
 */
class EntityResurrectBeforeEvent {
    cancel: boolean = false;
    damage: number;
    entity: Entity;
    damageSource: EntityDamageSource;

    /**
     * @param data - The event data.
     * @param data.hurtEntity - The entity that was hurt.
     * @param data.damage - The amount of damage.
     * @param data.damageSource - The source of the damage.
     */
    public constructor(data: {
        hurtEntity?: Entity;
        damage: any;
        damageSource: EntityDamageSource;
    }) {
        this.damage = data.damage;
        this.damageSource = data.damageSource;
        this.cancel = false;
        this.entity = data.hurtEntity;
    }
}

declare module "@minecraft/server" {
    interface WorldBeforeEvents {
        /**
         * Event triggered before an entity is resurrected.
         */
        entityResurrect: EntityResurrectEventSignal;
    }
}

export { EntityResurrectEventSignal, EntityResurrectBeforeEvent };
