import { world } from "@minecraft/server";

/**
 * Manages event subscriptions for Minecraft events.
 * Provides functionality to register event handlers on a given target.
 */
export default class EventManager {
    private static isInstance(arg: any): boolean {
        return typeof arg === "object" && arg !== null;
    }

    /**
     * Registers event handlers on a target object.
     * This method reads event handler configurations from the target's constructor.
     * @param events The target object or its constructor with event handlers.
     */
    public static registerEvents(...events: any[]): void {
        for (const event of events) {
            const constructor = this.isInstance(event)
                ? event.constructor
                : event;
            const targetClass = event;

            const eventHandlers = constructor["__eventHandlers"] as Map<
                string,
                Array<{ key: string; isAfter: boolean }>
            >;

            if (!eventHandlers) {
                console.warn("No event handlers found on the target.");
                return;
            }

            for (const [key, values] of eventHandlers.entries()) {
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
}
