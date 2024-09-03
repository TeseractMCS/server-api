import { Player, RawMessage } from "@minecraft/server";

function Button1<T = any>(
    buttonText:
        | RawMessage
        | string
        | ((this: T, player: Player) => RawMessage | string),
) {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor,
    ) {
        target.constructor["_button1"] = {
            buttonText,
            callback: descriptor.value,
        };
    };
}

export default Button1;
