import { Player } from "@minecraft/server";
import ActionFormIntializer from "./ActionFormInitializer";
type Constructor<T> = new (...args: any[]) => T;

/**
 * A method that will be executed before the form is sent, and can be used to append new buttons or optionally mutate form data after the it is initialized.
 *
 * This method will be executed after the decorator buttons are appended, and provides access to the form initializer, which can be used to append buttons by using appendButton method or cancel form delivery.
 * @param callback Callback that will be executed.
 */
function OnInitialized<T extends Constructor<InstanceType<T>> = any>(
    callback: (this: T, data: ActionFormIntializer, player: Player) => void,
) {
    return function (target: T) {
        if (!target.constructor["_buttons"]) {
            target.constructor["_buttons"] = [];
        }

        target.constructor["_onInitialized"].push({
            callback: callback,
        });
    };
}

export default OnInitialized;
