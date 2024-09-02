import { RawMessage, Player } from "@minecraft/server";

 function FormButton(
    buttonText: RawMessage | string | ((player: Player) => RawMessage | string),
    iconPath: string,
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