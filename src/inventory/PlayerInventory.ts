import Inventory from "./Inventory";
import ArmorSlot from "./ArmorSlot";
import {
    EntityInventoryComponent,
    EquipmentSlot,
    ItemStack,
} from "@minecraft/server";

export default class PlayerInventory extends Inventory {
    #minecraft_inventory: EntityInventoryComponent;

    constructor(a: EntityInventoryComponent) {
        super(a);
        this.#minecraft_inventory = a;
    }

    public getMainHandItemStack() {
        try {
            const slot = this.#minecraft_inventory.entity
                ?.getComponent("minecraft:equippable")
                ?.getEquipment(EquipmentSlot.Mainhand);

            return slot;
        } catch (error: any) {
            console.error(error, error.stack);
        }
    }

    public getOffHandItemStack() {
        try {
            const slot = this.#minecraft_inventory.entity
                ?.getComponent("minecraft:equippable")
                ?.getEquipment(EquipmentSlot.Offhand);

            return slot;
        } catch (error: any) {
            console.error(error, error.stack);
        }
    }

    public getArmorItemStack(armorSlot: ArmorSlot) {
        try {
            const slot = this.#minecraft_inventory.entity
                ?.getComponent("minecraft:equippable")
                ?.getEquipment(EquipmentSlot[armorSlot]);

            return slot;
        } catch (error: any) {
            console.error(error, error.stack);
        }
    }

    public setMainHandItemStack(itemStack?: ItemStack) {
        try {
            return this.#minecraft_inventory.entity
                ?.getComponent("minecraft:equippable")
                ?.setEquipment(EquipmentSlot.Mainhand, itemStack);
        } catch (error: any) {
            console.error(error, error.stack);
        }
    }

    public setOffHandItemStack(itemStack?: ItemStack) {
        try {
            return this.#minecraft_inventory.entity
                ?.getComponent("minecraft:equippable")
                ?.setEquipment(EquipmentSlot.Offhand, itemStack);
        } catch (error: any) {
            console.error(error, error.stack);
        }
    }

    public setArmorItemStack(armorSlot: ArmorSlot, itemStack?: ItemStack) {
        try {
            return this.#minecraft_inventory.entity
                ?.getComponent("minecraft:equippable")
                ?.setEquipment(EquipmentSlot[armorSlot], itemStack);
        } catch (error: any) {
            console.error(error, error.stack);
        }
    }

    public dropItemStack(slot: number) {
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
        } catch (error) {
            console.error(error, error.stack);
        }
    }

    public dropArmorItemStack(armorSlot: ArmorSlot) {
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
        } catch (error) {
            console.error(error, error.stack);
        }
    }

    public dropOffHandItemStack() {
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
        } catch (error) {
            console.error(error, error.stack);
        }
    }

    public dropMainHandItemStack() {
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
        } catch (error) {
            console.error(error, error.stack);
        }
    }
}
