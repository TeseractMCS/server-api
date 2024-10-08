import { Player, Vector3 } from "@minecraft/server";
import ArmorSlot from "../inventory/ArmorSlot";
import PlayerInventory from "../inventory/PlayerInventory";
import ScaledKnockbackOptions from "../util/interface/ScaledKnockbackOptions";
import ActionFormIntializer from "../ui/actionform/ActionFormInitializer";
import MessageFormInitializer from "../ui/messageform/MessageFormInitializer";
import FormError from "../util/error/FormError";
import IsInstance from "../util/general/IsInstance";
import FormType from "../ui/FormType";
import { Vec3d } from "../util/index";

declare module "@minecraft/server" {
    interface Player {
        /**
         * Sends a form to the player.
         * @param form The form that will be sent to the player.
         */
        sendForm(form: any | MessageFormInitializer | ActionFormIntializer): void;

        /**
         * Applies a scaled knockback effect to the player based on the direction and magnitude.
         * The effect is scaled according to the player's armor, with netherite armor providing extra resistance that will be inhibited.
         * @remarks This is an approach, the resistance override may not be exact.
         * @param directionX - The X direction of the knockback.
         * @param directionZ - The Z direction of the knockback.
         * @param magnitudeX - The X magnitude of the knockback.
         * @param magnitudeY - The Y magnitude of the knockback.
         * @param options - Optional parameters for customizing the knockback effect. This parameter currently does not take any effect on the knockback.
         */
        scaledKnockback(
            directionX: number,
            directionZ: number,
            magnitudeX: number,
            magnitudeY: number,
            options?: ScaledKnockbackOptions,
        ): void;

        /**
         * Clears any vertical impulse applied to the player, effectively resetting their vertical velocity.
         */
        clearVerticalImpulse(): void;

        /**
         * Retrieves the player's inventory.
         * @returns The player's inventory as a `PlayerInventory` instance.
         */
        getInventory(): PlayerInventory;

        /**
         * Retrieves the player's health.
         * @returns The player's current health.
         */
        getHealth(): number;

        /**
         * Retrieves the player's max health.
         * @returns The player's max health.
         */
        getMaxHealth(): number;

        /**
         * Retrieves the player's health component.
         * @returns The player's health component.
         */
        getHealthAttribute(): EntityHealthComponent;
    }
}

Player.prototype.scaledKnockback = function scaledKnockback(
    directionX: number,
    directionZ: number,
    magnitudeX: number,
    magnitudeY: number,
    options?: ScaledKnockbackOptions,
): void {
    let multiplier = 1.0;

    for (const armor in ArmorSlot) {
        const piece = this.getInventory().getArmorItemStack(ArmorSlot[armor]);
        if (piece?.typeId?.includes("netherite")) {
            multiplier += 0.15;
        }
    }

    this.applyKnockback(
        directionX,
        directionZ,
        magnitudeX * multiplier,
        magnitudeY * multiplier,
    );
};

Player.prototype.sendForm = async function sendForm(form: InstanceType<any>) {
    if (!IsInstance(form)) {
        throw new FormError(
            `Form passed to Player.sendForm function is not an instance of an object.`,
        );
    }

    if (!form.constructor["_formdata"]) {
        throw new FormError(
            `Object instance passed to Player.sendForm function is not a form.`,
        );
    }

    switch (form.constructor["_formdata"].type) {
        case FormType.ACTION:
            {
                const formData = new ActionFormIntializer(form);
                return formData.sendForm(this);
            }
            break;

        case FormType.MESSAGE:
            {
                const formData = new MessageFormInitializer(form);
                return formData.sendForm(this);
            }
            break;
        default:
            break;
    }
};

Player.prototype.applyImpulse = function applyImpulse(vector: Vector3) {
    const { x, y, z } = vector;
    const horizontal = Math.sqrt(x * x + z * z) * 2.0;
    const vertical = y < 0.0 ? 0.5 * y : y;
    this.scaledKnockback(x, z, horizontal, vertical);
};

Player.prototype.clearVerticalImpulse = function clearVerticalImpulse(
    this: Player,
) {
    this.scaledKnockback(0, 0, 0, -this.getVelocity().y);
};

Player.prototype.clearVelocity = function clearVelocity() {
    const velocity = new Vec3d(this.getVelocity());
    this.applyImpulse(new Vec3d(-velocity.x, -velocity.y + (!this.isOnGround ? 0.05 : 0.0), -velocity.z));
};

Player.prototype.getInventory = function getInventory(): PlayerInventory {
    return new PlayerInventory((this as Player).getComponent("inventory"));
};

Player.prototype.getHealth = function getHealth(this: Player) {
    return this.getComponent("health").currentValue;
};

Player.prototype.getMaxHealth = function getMaxHealth(this: Player) {
    return this.getComponent("health").defaultValue;
};

Player.prototype.getHealthAttribute = function getHealthAttribute(
    this: Player,
) {
    return this.getComponent("health");
};
