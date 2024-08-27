import { system, world } from "@minecraft/server";

export default class EventManager {
    private static isInstance(arg: any): boolean {
        return typeof arg === "object" && arg !== null;
    }

    public static registerEvents(target: any) {
        let constructor = this.isInstance(target) ? target.constructor : target;
        let targetClass = target;
        for (const [key, values] of constructor["__eventHandlers"].entries()) {
            for (const listener of values) {
                if (listener.isAfter) {
                    world.afterEvents[key]?.subscribe(
                        targetClass[listener.key].bind(targetClass),
                    );
                } else {
                    world.beforeEvents[key]?.subscribe(
                        targetClass[listener.key].bind(targetClass),
                    );
                }
            }
        }
    }
}
