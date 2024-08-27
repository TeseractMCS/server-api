import { Player, Vector3 } from "@minecraft/server";
import ArmorSlot from "../inventory/ArmorSlot";
import Inventory from "../inventory/Inventory";
import PlayerInventory from "../inventory/PlayerInventory";
import ScaledKnockbackOptions from "../util/interface/ScaledKnockbackOptions";

declare module "@minecraft/server" {
    interface Player {
        scaledKnockback(
            directionX: number,
            directionZ: number,
            magnitudeX: number,
            magnitudeY: number,
            options?: ScaledKnockbackOptions,
        ): void;
        clearVerticalImpulse(): void;
        getInventory(): PlayerInventory;
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
        if (piece?.getTypeId()?.includes("netherite")) {
            multiplier += 0.15;
        }
    }

    this.knockback(
        directionX,
        directionZ,
        magnitudeX * multiplier,
        magnitudeY * multiplier,
    );
};

Player.prototype.applyImpulse = function applyImpulse(vector: Vector3) {
    const { x, y, z } = vector;
    const horizontal = Math.sqrt(x * x + z * z) * 2.0;
    const vertical = y < 0.0 ? 0.5 * y : y;
    this.scaledKnockback(x, z, horizontal, vertical);
};

Player.prototype.clearVerticalImpulse = function clearVerticalImpulse() {
    let pieces = 0;
    let multiplier = 1.0;

    for (const armor in ArmorSlot) {
        const piece = this.getInventory().getArmorItemStack(ArmorSlot[armor]);
        pieces += piece?.getTypeId()?.includes("netherite") ? 1 : 0;
        if (piece?.getTypeId()?.includes("netherite")) {
            multiplier += 0.15;
        }
    }
    this.knockback(0, 0, 0, -this.getVelocity().y * multiplier);
};

Player.prototype.getInventory = function getInventory(): PlayerInventory {
    return new PlayerInventory((this as Player).getComponent("inventory"));
};
