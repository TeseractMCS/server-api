var _Inventory_minecraft_inventory;
class Inventory {
    constructor(data) {
        _Inventory_minecraft_inventory.set(this, void 0);
        __classPrivateFieldSet(this, _Inventory_minecraft_inventory, data, "f");
    }
    emptySlotsCount() {
        try {
            return __classPrivateFieldGet(this, _Inventory_minecraft_inventory, "f").container.emptySlotsCount;
        }
        catch (error) {
            console.error(error, error.stack);
        }
    }
    getSize() {
        try {
            return __classPrivateFieldGet(this, _Inventory_minecraft_inventory, "f").container.size;
        }
        catch (error) {
            console.error(error, error.stack);
        }
    }
    addItem(itemStack) {
        try {
            return;
            __classPrivateFieldGet(this, _Inventory_minecraft_inventory, "f").container.addItem(itemStack);
        }
        catch (error) {
            console.error(error, error.stack);
        }
    }
    clearAll() {
        try {
            __classPrivateFieldGet(this, _Inventory_minecraft_inventory, "f").container.clearAll();
        }
        catch (error) {
            console.error(error, error.stack);
        }
    }
    getItem(slot) {
        try {
            const item = __classPrivateFieldGet(this, _Inventory_minecraft_inventory, "f").container.getItem(slot);
            return item ?? undefined;
        }
        catch (error) {
            console.error(error, error.stack);
        }
    }
    getSlot(slot) {
        try {
            const containerSlot = __classPrivateFieldGet(this, _Inventory_minecraft_inventory, "f").container.getSlot(slot);
            return containerSlot ?? undefined;
        }
        catch (error) {
            console.error(error, error.stack);
        }
    }
    moveItem(fromSlot, toSlot, toInventory) {
        try {
            __classPrivateFieldGet(this, _Inventory_minecraft_inventory, "f").container.moveItem(fromSlot, toSlot, toInventory.getContainer());
        }
        catch (error) {
            console.error(error, error.stack);
        }
    }
    setItem(slot, itemStack) {
        try {
            __classPrivateFieldGet(this, _Inventory_minecraft_inventory, "f").container.setItem(slot, itemStack);
        }
        catch (error) {
            console.error(error, error.stack);
        }
    }
    swapItems(slot, otherSlot, otherInventory) {
        try {
            __classPrivateFieldGet(this, _Inventory_minecraft_inventory, "f").container.swapItems(slot, otherSlot, otherInventory.getContainer());
        }
        catch (error) {
            console.error(error, error.stack);
        }
    }
    transferItem(fromSlot, toInventory) {
        try {
            return __classPrivateFieldGet(this, _Inventory_minecraft_inventory, "f").container.transferItem(fromSlot, toInventory.getContainer());
        }
        catch (error) {
            console.error(error, error.stack);
        }
    }
    getContainer() {
        try {
            return __classPrivateFieldGet(this, _Inventory_minecraft_inventory, "f").container;
        }
        catch (error) {
            console.error(error, error.stack);
        }
    }
    isPrivate() {
        try {
            return __classPrivateFieldGet(this, _Inventory_minecraft_inventory, "f").private;
        }
        catch (error) {
            console.error(error, error.stack);
        }
    }
    getContainerType() {
        try {
            return __classPrivateFieldGet(this, _Inventory_minecraft_inventory, "f").containerType;
        }
        catch (error) {
            console.error(error, error.stack);
        }
    }
    getInventorySize() {
        try {
            return __classPrivateFieldGet(this, _Inventory_minecraft_inventory, "f").inventorySize;
        }
        catch (error) {
            console.error(error, error.stack);
        }
    }
    getAdditionalSlotsPerStrength() {
        try {
            return __classPrivateFieldGet(this, _Inventory_minecraft_inventory, "f").additionalSlotsPerStrength;
        }
        catch (error) {
            console.error(error, error.stack);
        }
    }
    canBeSiphonedFrom() {
        try {
            return __classPrivateFieldGet(this, _Inventory_minecraft_inventory, "f").canBeSiphonedFrom;
        }
        catch (error) {
            console.error(error, error.stack);
        }
    }
    restrictedToOwner() {
        try {
            return __classPrivateFieldGet(this, _Inventory_minecraft_inventory, "f").restrictToOwner;
        }
        catch (error) {
            console.error(error, error.stack);
        }
    }
    getEntity() {
        try {
            if (!__classPrivateFieldGet(this, _Inventory_minecraft_inventory, "f").entity) {
                return undefined;
            }
            return __classPrivateFieldGet(this, _Inventory_minecraft_inventory, "f").entity;
        }
        catch (error) {
            console.error(error, error.stack);
        }
    }
    getTypeId() {
        try {
            return __classPrivateFieldGet(this, _Inventory_minecraft_inventory, "f").typeId;
        }
        catch (error) {
            console.error(error, error.stack);
        }
    }
    isValid() {
        try {
            return __classPrivateFieldGet(this, _Inventory_minecraft_inventory, "f").isValid();
        }
        catch (error) {
            console.error(error, error.stack);
        }
    }
}
_Inventory_minecraft_inventory = new WeakMap();
export default Inventory;
//# sourceMappingURL=Inventory.js.map