var _PlayerInventory_minecraft_inventory;
import Inventory from "./Inventory";
import { EquipmentSlot, } from "@minecraft/server";
class PlayerInventory extends Inventory {
    constructor(a) {
        super(a);
        _PlayerInventory_minecraft_inventory.set(this, void 0);
        __classPrivateFieldSet(this, _PlayerInventory_minecraft_inventory, a, "f");
    }
    getMainHandItemStack() {
        try {
            const slot = __classPrivateFieldGet(this, _PlayerInventory_minecraft_inventory, "f").entity
                ?.getComponent("minecraft:equippable")
                ?.getEquipment(EquipmentSlot.Mainhand);
            return slot;
        }
        catch (error) {
            console.error(error, error.stack);
        }
    }
    getOffHandItemStack() {
        try {
            const slot = __classPrivateFieldGet(this, _PlayerInventory_minecraft_inventory, "f").entity
                ?.getComponent("minecraft:equippable")
                ?.getEquipment(EquipmentSlot.Offhand);
            return slot;
        }
        catch (error) {
            console.error(error, error.stack);
        }
    }
    getArmorItemStack(armorSlot) {
        try {
            const slot = __classPrivateFieldGet(this, _PlayerInventory_minecraft_inventory, "f").entity
                ?.getComponent("minecraft:equippable")
                ?.getEquipment(EquipmentSlot[armorSlot]);
            return slot;
        }
        catch (error) {
            console.error(error, error.stack);
        }
    }
    setMainHandItemStack(itemStack) {
        try {
            return __classPrivateFieldGet(this, _PlayerInventory_minecraft_inventory, "f").entity
                ?.getComponent("minecraft:equippable")
                ?.setEquipment(EquipmentSlot.Mainhand, itemStack);
        }
        catch (error) {
            console.error(error, error.stack);
        }
    }
    setOffHandItemStack(itemStack) {
        try {
            return __classPrivateFieldGet(this, _PlayerInventory_minecraft_inventory, "f").entity
                ?.getComponent("minecraft:equippable")
                ?.setEquipment(EquipmentSlot.Offhand, itemStack);
        }
        catch (error) {
            console.error(error, error.stack);
        }
    }
    setArmorItemStack(armorSlot, itemStack) {
        try {
            return __classPrivateFieldGet(this, _PlayerInventory_minecraft_inventory, "f").entity
                ?.getComponent("minecraft:equippable")
                ?.setEquipment(EquipmentSlot[armorSlot], itemStack);
        }
        catch (error) {
            console.error(error, error.stack);
        }
    }
    dropItemStack(slot) {
        try {
            const item = this.getItem(slot);
            if (!item) {
                return false;
            }
            this.setItem(slot);
            const itemEntity = this.getEntity().dimension.spawnItem(item, this.getEntity()?.location);
            return itemEntity;
        }
        catch (error) {
            console.error(error, error.stack);
        }
    }
    dropArmorItemStack(armorSlot) {
        try {
            const item = this.getArmorItemStack(armorSlot);
            if (!item) {
                return false;
            }
            this.setArmorItemStack(armorSlot, undefined);
            const itemEntity = this.getEntity().dimension.spawnItem(item, this.getEntity()?.location);
            return itemEntity;
        }
        catch (error) {
            console.error(error, error.stack);
        }
    }
    dropOffHandItemStack() {
        try {
            const item = this.getOffHandItemStack();
            if (!item) {
                return false;
            }
            this.setOffHandItemStack(undefined);
            const itemEntity = this.getEntity().dimension.spawnItem(item, this.getEntity()?.location);
            return itemEntity;
        }
        catch (error) {
            console.error(error, error.stack);
        }
    }
    dropMainHandItemStack() {
        try {
            const item = this.getMainHandItemStack();
            if (!item) {
                return false;
            }
            this.setMainHandItemStack(undefined);
            const itemEntity = this.getEntity().dimension.spawnItem(item, this.getEntity()?.location);
            return itemEntity;
        }
        catch (error) {
            console.error(error, error.stack);
        }
    }
}
_PlayerInventory_minecraft_inventory = new WeakMap();
export default PlayerInventory;
//# sourceMappingURL=PlayerInventory.js.map