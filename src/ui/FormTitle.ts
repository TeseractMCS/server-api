import { Player, RawMessage } from "@minecraft/server";
import FormType from "./FormType";
import FormError from "src/util/error/FormError";

type Constructor<T = {}> = new (...args: any[]) => T;

export default function FormTitle(
    title: RawMessage | string | ((player: Player) => RawMessage | string),
) {
    return function (target: Constructor) {
        if (!target.constructor["_formdata"]) {
            throw new FormError(
                `@FormTitle called on non-form class. Did you call it before @<Type>Form decorator?`,
            );
        }
        target.constructor["_formdata"]["title"] = title;
    };
}
