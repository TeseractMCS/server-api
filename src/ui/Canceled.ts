import { Player } from "@minecraft/server";

function Canceled(
    target: any,
    propertyKey: string,
    descriptor: TypedPropertyDescriptor<(player: Player) => void>,
) {
    target.constructor["_canceled"] = descriptor.value;
}

export default Canceled;
