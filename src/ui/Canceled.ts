import { Player } from "@minecraft/server";
import { FormCancelationReason } from "@minecraft/server-ui";

function Canceled(
    target: any,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<(player: Player, reason: FormCancelationReason) => void>,
) {
    target.constructor["_canceled"] = descriptor.value;
}

export default Canceled;
