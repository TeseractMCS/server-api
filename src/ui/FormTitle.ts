import { Player, RawMessage } from "@minecraft/server";
import FormError from "../util/error/FormError";

type Constructor<T> = new (...args: any[]) => T;

function FormTitle<T extends Constructor<InstanceType<T>> = any>(
    title:
        | RawMessage
        | string
        | ((this: InstanceType<T>, player: Player) => RawMessage | string),
) {
    return function (target: T) {
        if (!target["_formdata"]) {
            target["_formdata"] = {};
        }
        target["_formdata"]["title"] = title;
    };
}

export default FormTitle;
