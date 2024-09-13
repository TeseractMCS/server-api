import { RawMessage, Player } from "@minecraft/server";

function FormButton<T = any>(
    buttonText:
        | RawMessage
        | string
        | ((this: T, player: Player) => RawMessage | string),
    iconPath?: string | ((this: T, player: Player, selection: number) => string),
) {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor,
    ) {
        if (!target.constructor["_buttons"]) {
            target.constructor["_buttons"] = [];
        }
        target.constructor["_buttons"].push({
            buttonText,
            iconPath,
            callback: descriptor.value,
        });
    };
}

export default FormButton;
