import { Player, RawMessage } from "@minecraft/server";
import FormError from "src/util/error/FormError";

type Constructor<T = {}> = new (...args: any[]) => T;

function FormBody<T extends Constructor<InstanceType<T>> = any>(
    body:
        | RawMessage
        | string
        | ((this: InstanceType<T>, player: Player) => RawMessage | string),
) {
    return function (target: T) {
        if (!target.constructor["_formdata"]) {
            throw new FormError(
                `@FormBody called on non-form class. Did you call it before @<Type>Form decorator?`,
            );
        }
        target.constructor["_formdata"]["body"] = body;
    };
}

export default FormBody;
