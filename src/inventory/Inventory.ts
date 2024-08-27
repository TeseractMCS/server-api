import {
    Container,
    ContainerSlot,
    Entity,
    EntityInventoryComponent,
    ItemStack,
} from "@minecraft/server";

export default class Inventory {
    #minecraft_inventory: EntityInventoryComponent;

    constructor(data: EntityInventoryComponent) {
        this.#minecraft_inventory = data;
    }

    public emptySlotsCount(): number {
        try {
            return this.#minecraft_inventory.container.emptySlotsCount;
        } catch (error: any) {
            console.error(error, error.stack);
        }
    }

    public getSize(): number {
        try {
            return this.#minecraft_inventory.container.size;
        } catch (error: any) {
            console.error(error, error.stack);
        }
    }

    public addItem(itemStack: ItemStack): ItemStack {
        try {
            return;
            this.#minecraft_inventory.container.addItem(itemStack);
        } catch (error: any) {
            console.error(error, error.stack);
        }
    }

    public clearAll(): void {
        try {
            this.#minecraft_inventory.container.clearAll();
        } catch (error: any) {
            console.error(error, error.stack);
        }
    }

    public getItem(slot: number): ItemStack | undefined {
        try {
            const item = this.#minecraft_inventory.container.getItem(slot);
            return item ?? undefined;
        } catch (error: any) {
            console.error(error, error.stack);
        }
    }

    public getSlot(slot: number): ContainerSlot {
        try {
            const containerSlot =
                this.#minecraft_inventory.container.getSlot(slot);
            return containerSlot ?? undefined;
        } catch (error: any) {
            console.error(error, error.stack);
        }
    }

    public moveItem(
        fromSlot: number,
        toSlot: number,
        toInventory: Inventory,
    ): void {
        try {
            this.#minecraft_inventory.container.moveItem(
                fromSlot,
                toSlot,
                toInventory.getContainer(),
            );
        } catch (error: any) {
            console.error(error, error.stack);
        }
    }

    public setItem(slot: number, itemStack?: ItemStack): void {
        try {
            this.#minecraft_inventory.container.setItem(slot, itemStack);
        } catch (error: any) {
            console.error(error, error.stack);
        }
    }

    public swapItems(
        slot: number,
        otherSlot: number,
        otherInventory: Inventory,
    ): void {
        try {
            this.#minecraft_inventory.container.swapItems(
                slot,
                otherSlot,
                otherInventory.getContainer(),
            );
        } catch (error: any) {
            console.error(error, error.stack);
        }
    }

    public transferItem(fromSlot: number, toInventory: Inventory): ItemStack {
        try {
            return this.#minecraft_inventory.container.transferItem(
                fromSlot,
                toInventory.getContainer(),
            );
        } catch (error: any) {
            console.error(error, error.stack);
        }
    }

    public getContainer(): Container | undefined {
        try {
            return this.#minecraft_inventory.container;
        } catch (error: any) {
            console.error(error, error.stack);
        }
    }

    public isPrivate(): boolean {
        try {
            return this.#minecraft_inventory.private;
        } catch (error: any) {
            console.error(error, error.stack);
        }
    }

    public getContainerType(): string {
        try {
            return this.#minecraft_inventory.containerType;
        } catch (error: any) {
            console.error(error, error.stack);
        }
    }

    public getInventorySize(): number {
        try {
            return this.#minecraft_inventory.inventorySize;
        } catch (error: any) {
            console.error(error, error.stack);
        }
    }

    public getAdditionalSlotsPerStrength(): number {
        try {
            return this.#minecraft_inventory.additionalSlotsPerStrength;
        } catch (error: any) {
            console.error(error, error.stack);
        }
    }

    public canBeSiphonedFrom(): boolean {
        try {
            return this.#minecraft_inventory.canBeSiphonedFrom;
        } catch (error: any) {
            console.error(error, error.stack);
        }
    }

    public restrictedToOwner(): boolean {
        try {
            return this.#minecraft_inventory.restrictToOwner;
        } catch (error: any) {
            console.error(error, error.stack);
        }
    }

    public getEntity(): Entity | undefined {
        try {
            if (!this.#minecraft_inventory.entity) {
                return undefined;
            }
            return this.#minecraft_inventory.entity;
        } catch (error: any) {
            console.error(error, error.stack);
        }
    }

    public getTypeId(): string {
        try {
            return this.#minecraft_inventory.typeId;
        } catch (error: any) {
            console.error(error, error.stack);
        }
    }

    public isValid(): boolean {
        try {
            return this.#minecraft_inventory.isValid();
        } catch (error: any) {
            console.error(error, error.stack);
        }
    }
}
