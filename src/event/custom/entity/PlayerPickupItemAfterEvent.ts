/**
 * @deprecated
 */
// import { ItemStack, ItemUseAfterEvent, Player, world } from "@minecraft/server";
// import EventSignal from "../EventSignal";
// import StaticRunnable from "../../../timer/StaticRunnable";

// /**
//  * Contains information related to a player picking up an item. This fires when a player picks up an item.
//  */
// class PlayerPickupItemAfterEvent {
//     /**
//      * Item that the player picked up.
//      */
//     public readonly pickedItem: ItemStack;
//     /**
//      * Player that has picked up the item.
//      */
//     public readonly player: Player;

//     public constructor(player: Player, item: ItemStack) {
//         this.pickedItem = item;
//         this.player = player;

//         Object.seal(this);
//     }
// }

// /**
//  * This event fires when a player picks up an item.
//  */
// interface PlayerPickupItemAfterEventSignal
//     extends EventSignal<PlayerPickupItemAfterEvent> {
//     subscribe(
//         callback: (event: PlayerPickupItemAfterEvent) => void,
//     ): (event: PlayerPickupItemAfterEvent) => void;
//     unsubscribe(callback: (event: PlayerPickupItemAfterEvent) => void): void;
// }
// class PlayerPickupItemAfterEventSignal extends EventSignal<PlayerPickupItemAfterEvent> {}

// // declare module "@minecraft/server" {
// //     interface WorldAfterEvents {
// //         /**
// //          * This event fires when a player picks up an item.
// //          */
// //         playerPickupItem: PlayerPickupItemAfterEventSignal;
// //     }
// // }

// // world.afterEvents.playerPickupItem = new PlayerPickupItemAfterEventSignal();

// world.afterEvents.entitySpawn.subscribe(({ entity, cause }) => {
//     if (!entity.hasComponent("item")) {
//         return;
//     }
//     const itemComponent = entity.getComponent("item");
//     itemComponent.itemStack.setDynamicProperty(
//         "teseract_server_api:item_dropped_inground",
//         true,
//     );
// });

// class EventEmitter extends StaticRunnable {
//     static override *onRunJob(...args: any[]): Generator<void, void, void> {
//         for (const player of world.getAllPlayers()) {
//             const inventory = player.getInventory();
//             for (let i = 0; i < inventory.getSize(); i++) {
//                 const item = inventory.getItem(i);
//                 if (!item) {
//                     continue;
//                 }
//                 if (
//                     item.getDynamicProperty(
//                         "teseract_server_api:item_dropped_inground",
//                     ) == true
//                 ) {
//                     item.setDynamicProperty(
//                         "teseract_server_api:item_dropped_inground",
//                         undefined,
//                     );
//                     // world.afterEvents.playerPickupItem.triggerEvent(
//                     //     new PlayerPickupItemAfterEvent(player, item),
//                     // );
//                 }
//             }
//         }
//     }
// }

// EventEmitter.runTimer(1);

// export { PlayerPickupItemAfterEvent, PlayerPickupItemAfterEventSignal };
