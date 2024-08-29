import { world } from "@minecraft/server";
export default class EventManager {
    static isInstance(arg) {
        return typeof arg === "object" && arg !== null;
    }
    static registerEvents(target) {
        let constructor = this.isInstance(target) ? target.constructor : target;
        let targetClass = target;
        for (const [key, values] of constructor["__eventHandlers"].entries()) {
            for (const listener of values) {
                if (listener.isAfter) {
                    world.afterEvents[key]?.subscribe(targetClass[listener.key].bind(targetClass));
                }
                else {
                    world.beforeEvents[key]?.subscribe(targetClass[listener.key].bind(targetClass));
                }
            }
        }
    }
}
//# sourceMappingURL=EventManager.js.map