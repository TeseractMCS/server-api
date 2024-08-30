import "reflect-metadata";
import { world } from "@minecraft/server";

export default function EventHandler(
    target: any,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<(event: any) => void>
) {
    let constructor: any;
    
    if (typeof target === "function") {
        constructor = target;
    } else {
        constructor = target.constructor;
    }

    if (!constructor.__eventHandlers) {
        constructor.__eventHandlers = new Map();
    }

    const handlers = constructor.__eventHandlers;

    if (!handlers.has(constructor.name)) {
        handlers.set(constructor.name, []);
    }

    const paramtypes = Reflect.getMetadata(
        "design:paramtypes",
        target,
        propertyKey,
    );

    if (!paramtypes || paramtypes.length === 0) {
        throw new Error(
            `Method "${propertyKey}" in class "${constructor.name}" must have at least one parameter for the @EventHandler decorator.`,
        );
    }

    const unparsedName = paramtypes[0].name as string;

    const eventName =
        unparsedName[0].toLowerCase() +
        unparsedName
            .substring(1)
            .replace("Before", "")
            .replace("After", "")
            .replace("Event", "");

    const isAfter = unparsedName.includes("AfterEvent");

    if (!world.afterEvents[eventName] && world.beforeEvents[eventName]) {
        throw new Error(
            `Event type '${unparsedName}' used in method "${propertyKey}" of class "${constructor.name}" is not registered in EventMap.`,
        );
    }

    if (!constructor.__eventHandlers.has(eventName)) {
        constructor.__eventHandlers.set(eventName, [])
    }

    constructor.__eventHandlers.get(eventName).push({
        isAfter: isAfter,
        key: propertyKey,
    });
}
