import { Container, ContainerSlot, Entity, EntityInventoryComponent, ItemStack } from "@minecraft/server";
export default class Inventory {
    #private;
    constructor(data: EntityInventoryComponent);
    emptySlotsCount(): number;
    getSize(): number;
    addItem(itemStack: ItemStack): ItemStack;
    clearAll(): void;
    getItem(slot: number): ItemStack | undefined;
    getSlot(slot: number): ContainerSlot;
    moveItem(fromSlot: number, toSlot: number, toInventory: Inventory): void;
    setItem(slot: number, itemStack?: ItemStack): void;
    swapItems(slot: number, otherSlot: number, otherInventory: Inventory): void;
    transferItem(fromSlot: number, toInventory: Inventory): ItemStack;
    getContainer(): Container | undefined;
    isPrivate(): boolean;
    getContainerType(): string;
    getInventorySize(): number;
    getAdditionalSlotsPerStrength(): number;
    canBeSiphonedFrom(): boolean;
    restrictedToOwner(): boolean;
    getEntity(): Entity | undefined;
    getTypeId(): string;
    isValid(): boolean;
}
