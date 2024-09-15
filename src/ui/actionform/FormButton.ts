import { RawMessage, Player } from "@minecraft/server";

/**
 * Decorator for creating a button in an action form.
 * The decorated method will be executed when the corresponding button is selected.
 * When selected, it will call the function with the player object the form was sent to, and the selection index.    
 */
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
