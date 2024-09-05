import { Player, RawMessage } from "@minecraft/server";
import FormError from "../util/error/FormError";

type Constructor<T = {}> = new (...args: any[]) => T;

function FormBody<T extends Constructor<InstanceType<T>> = any>(
    body:
        | RawMessage
        | string
        | ((this: InstanceType<T>, player: Player) => RawMessage | string),
) {
    return function (target: T) {
        if (!target["_formdata"]) {
            target["_formdata"] = {};
        } 
        target["_formdata"]["body"] = body;
    };
}

export default FormBody;
