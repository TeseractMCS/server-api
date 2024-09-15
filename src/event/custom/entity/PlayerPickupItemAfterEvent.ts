import { ItemStack, ItemUseAfterEvent, Player, world } from "@minecraft/server";
import EventSignal from "../EventSignal";

/**
 * Contains information related to a player picking up an item. This fires when a player picks up an item.
 */
class PlayerPickupItemAfterEvent {
    /**
     * Item that the player picked up.
     */
    public readonly pickedItem: ItemStack;
    /**
     * Player that has picked up the item.
     */
    public readonly player: Player;

    public constructor(player: Player, item: ItemStack) {
        this.pickedItem = item;
        this.player = player;
        
        Object.seal(this);
    }
}

/**
 * This event fires when a player picks up an item.
 */
interface PlayerPickupItemAfterEventSignal
    extends EventSignal<PlayerPickupItemAfterEvent> {
    subscribe(
        callback: (event: PlayerPickupItemAfterEvent) => void,
    ): (event: PlayerPickupItemAfterEvent) => void;
    unsubscribe(callback: (event: PlayerPickupItemAfterEvent) => void): void;
}
class PlayerPickupItemAfterEventSignal extends EventSignal<PlayerPickupItemAfterEvent> {}

export { PlayerPickupItemAfterEvent, PlayerPickupItemAfterEventSignal };
