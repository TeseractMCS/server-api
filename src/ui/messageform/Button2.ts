import { RawMessage, Player } from "@minecraft/server";

function Button2<T = any>(
    buttonText:
        | RawMessage
        | string
        | ((this: T, player: Player) => RawMessage | string),
) {
    return function (
        target: T,
        propertyKey: string,
        descriptor: PropertyDescriptor,
    ) {
        target.constructor["_button2"] = {
            buttonText,
            callback: descriptor.value,
        };
    };
}

export default Button2;
