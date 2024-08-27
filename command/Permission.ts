import { Player } from "@minecraft/server";

export default function Permission(permission: (player: Player) => boolean): any {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor,
    ) {
        if (!target.__commandData) {
            target.__commandData = {};
        }
        if (descriptor) {
            if (!target.__commandData[propertyKey]) {
                target.__commandData[propertyKey] = {};
            }
            target.__commandData[propertyKey].permission = permission;
        } else {
            target.__commandData.permission = permission;
        }
    };
}