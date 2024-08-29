import { Player } from "@minecraft/server";
import ArmorSlot from "../inventory/ArmorSlot";
import PlayerInventory from "../inventory/PlayerInventory";
Player.prototype.scaledKnockback = function scaledKnockback(directionX, directionZ, magnitudeX, magnitudeY, options) {
    let multiplier = 1.0;
    for (const armor in ArmorSlot) {
        const piece = this.getInventory().getArmorItemStack(ArmorSlot[armor]);
        if (piece?.getTypeId()?.includes("netherite")) {
            multiplier += 0.15;
        }
    }
    this.knockback(directionX, directionZ, magnitudeX * multiplier, magnitudeY * multiplier);
};
Player.prototype.applyImpulse = function applyImpulse(vector) {
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
Player.prototype.getInventory = function getInventory() {
    return new PlayerInventory(this.getComponent("inventory"));
};
//# sourceMappingURL=Player.js.map