import Inventory from "./Inventory";
import ArmorSlot from "./ArmorSlot";
import {
    Entity,
    EntityInventoryComponent,
    EquipmentSlot,
    ItemStack,
} from "@minecraft/server";

/**
 * Represents a player's inventory, extending the base Inventory class to include
 * methods specific to equippable items and dropping items.
 */
export default class PlayerInventory extends Inventory {
    #minecraft_inventory: EntityInventoryComponent;

    /**
     * Creates an instance of the PlayerInventory class.
     * @param a The EntityInventoryComponent associated with the player's inventory.
     */
    constructor(a: EntityInventoryComponent) {
        super(a);
        this.#minecraft_inventory = a;
    }

    /**
     * Retrieves the ItemStack in the player's main hand.
     * @returns The ItemStack in the main hand, or undefined if no item is equipped.
     */
    public getMainHandItemStack(): ItemStack | undefined {
        try {
            const slot = this.#minecraft_inventory.entity
                ?.getComponent("minecraft:equippable")
                ?.getEquipment(EquipmentSlot.Mainhand);

            return slot;
        } catch (error: any) {
            console.error(error, error.stack);
        }
    }

    /**
     * Retrieves the ItemStack in the player's off hand.
     * @returns The ItemStack in the off hand, or undefined if no item is equipped.
     */
    public getOffHandItemStack(): ItemStack | undefined {
        try {
            const slot = this.#minecraft_inventory.entity
                ?.getComponent("minecraft:equippable")
                ?.getEquipment(EquipmentSlot.Offhand);

            return slot;
        } catch (error: any) {
            console.error(error, error.stack);
        }
    }

    /**
     * Retrieves the ItemStack in the player's armor slot.
     * @param armorSlot The ArmorSlot to retrieve the ItemStack from.
     * @returns The ItemStack in the specified armor slot, or undefined if no item is equipped.
     */
    public getArmorItemStack(armorSlot: ArmorSlot): ItemStack | undefined {
        try {
            const slot = this.#minecraft_inventory.entity
                ?.getComponent("minecraft:equippable")
                ?.getEquipment(EquipmentSlot[armorSlot]);

            return slot;
        } catch (error: any) {
            console.error(error, error.stack);
        }
    }

    /**
     * Sets the ItemStack in the player's main hand.
     * @param itemStack The ItemStack to set in the main hand, or undefined to clear the slot.
     */
    public setMainHandItemStack(itemStack?: ItemStack): void {
        try {
            this.#minecraft_inventory.entity
                ?.getComponent("minecraft:equippable")
                ?.setEquipment(EquipmentSlot.Mainhand, itemStack);
        } catch (error: any) {
            console.error(error, error.stack);
        }
    }

    /**
     * Sets the ItemStack in the player's off hand.
     * @param itemStack The ItemStack to set in the off hand, or undefined to clear the slot.
     */
    public setOffHandItemStack(itemStack?: ItemStack): void {
        try {
            this.#minecraft_inventory.entity
                ?.getComponent("minecraft:equippable")
                ?.setEquipment(EquipmentSlot.Offhand, itemStack);
        } catch (error: any) {
            console.error(error, error.stack);
        }
    }

    /**
     * Sets the ItemStack in the player's armor slot.
     * @param armorSlot The ArmorSlot to set the ItemStack in.
     * @param itemStack The ItemStack to set, or undefined to clear the slot.
     */
    public setArmorItemStack(armorSlot: ArmorSlot, itemStack?: ItemStack): void {
        try {
            this.#minecraft_inventory.entity
                ?.getComponent("minecraft:equippable")
                ?.setEquipment(EquipmentSlot[armorSlot], itemStack);
        } catch (error: any) {
            console.error(error, error.stack);
        }
    }

    /**
     * Drops the ItemStack from a specific slot in the inventory.
     * @param slot The slot index from which to drop the item.
     * @returns The dropped ItemStack entity if successful, otherwise false.
     */
    public dropItemStack(slot: number): Entity | false {
        try {
            const item = this.getItem(slot);

            if (!item) {
                return false;
            }

            this.setItem(slot);

            const itemEntity = this.getEntity().dimension.spawnItem(
                item,
                this.getEntity()?.location,
            );

            return itemEntity;
        } catch (error: any) {
            console.error(error, error.stack);
        }
    }

    /**
     * Drops the ItemStack from a specific armor slot.
     * @param armorSlot The ArmorSlot from which to drop the item.
     * @returns The dropped ItemStack entity if successful, otherwise false.
     */
    public dropArmorItemStack(armorSlot: ArmorSlot): Entity | false {
        try {
            const item = this.getArmorItemStack(armorSlot);

            if (!item) {
                return false;
            }

            this.setArmorItemStack(armorSlot, undefined);

            const itemEntity = this.getEntity().dimension.spawnItem(
                item,
                this.getEntity()?.location,
            );

            return itemEntity;
        } catch (error: any) {
            console.error(error, error.stack);
        }
    }

    /**
     * Drops the ItemStack from the player's off hand.
     * @returns The dropped ItemStack entity if successful, otherwise false.
     */
    public dropOffHandItemStack(): Entity | false {
        try {
            const item = this.getOffHandItemStack();

            if (!item) {
                return false;
            }

            this.setOffHandItemStack(undefined);

            const itemEntity = this.getEntity().dimension.spawnItem(
                item,
                this.getEntity()?.location,
            );

            return itemEntity;
        } catch (error: any) {
            console.error(error, error.stack);
        }
    }

    /**
     * Drops the ItemStack from the player's main hand.
     * @returns The dropped ItemStack entity if successful, otherwise false.
     */
    public dropMainHandItemStack(): Entity | false {
        try {
            const item = this.getMainHandItemStack();

            if (!item) {
                return false;
            }

            this.setMainHandItemStack(undefined);

            const itemEntity = this.getEntity().dimension.spawnItem(
                item,
                this.getEntity()?.location,
            );

            return itemEntity;
        } catch (error: any) {
            console.error(error, error.stack);
        }
    }
}
