import PlayerInventory from "../inventory/PlayerInventory";
import ScaledKnockbackOptions from "../util/interface/ScaledKnockbackOptions";
declare module "@minecraft/server" {
    interface Player {
        scaledKnockback(directionX: number, directionZ: number, magnitudeX: number, magnitudeY: number, options?: ScaledKnockbackOptions): void;
        clearVerticalImpulse(): void;
        getInventory(): PlayerInventory;
    }
}
