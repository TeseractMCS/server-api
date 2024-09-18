import { Player } from "@minecraft/server";
import ActionFormIntializer from "./ActionFormInitializer";
type Constructor<T> = new (...args: any[]) => T;

/**
 * A method that will be executed before the form buttons are created and after the title and body are initialized, and can be used to append new buttons or optionally mutate form data after the it is initialized.
 *
 * This method will be executed after the decorator buttons are appended, and provides access to the form initializer, which can be used to append buttons by using appendButton method or cancel form delivery.
 * @param callback Callback that will be executed.
 */
function OnActionFormInit<T extends Constructor<InstanceType<T>> = any>(
    callback: (this: T, data: ActionFormIntializer, player: Player) => void,
) {
    return function (target: T) {
        if (!target["_onInitialized"]) {
            target["_onInitialized"] = []
        }

        target["_onInitialized"] = callback
    };
}

export default OnActionFormInit;
