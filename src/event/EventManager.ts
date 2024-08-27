import { world } from "@minecraft/server";

export default class EventManager {
    private static isInstance(arg: any): boolean {
        return typeof arg === "object" && arg !== null;
    }

    public static registerEvents(target: any) {
        let constructor = this.isInstance(target) ? target.constructor : target;
        for (const [key, values] of constructor[
            "__eventHandlers"
        ].entries()) {
            for (const listener of values) {
                if (listener.isAfter) {
                    world.afterEvents[key]?.subscribe(
                        target[listener.key].bind(target),
                    );
                } else {
                    world.beforeEvents[key]?.subscribe(
                        target[listener.key].bind(target),
                    );
                }
            }
        }
    }
}
