import Inventory from "./Inventory";
import ArmorSlot from "./ArmorSlot";
import { EntityInventoryComponent, ItemStack } from "@minecraft/server";
export default class PlayerInventory extends Inventory {
    #private;
    constructor(a: EntityInventoryComponent);
    getMainHandItemStack(): ItemStack;
    getOffHandItemStack(): ItemStack;
    getArmorItemStack(armorSlot: ArmorSlot): ItemStack;
    setMainHandItemStack(itemStack?: ItemStack): boolean;
    setOffHandItemStack(itemStack?: ItemStack): boolean;
    setArmorItemStack(armorSlot: ArmorSlot, itemStack?: ItemStack): boolean;
    dropItemStack(slot: number): false | import("@minecraft/server").Entity;
    dropArmorItemStack(armorSlot: ArmorSlot): false | import("@minecraft/server").Entity;
    dropOffHandItemStack(): false | import("@minecraft/server").Entity;
    dropMainHandItemStack(): false | import("@minecraft/server").Entity;
}
