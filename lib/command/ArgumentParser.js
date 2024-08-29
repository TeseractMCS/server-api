import { Player, world } from "@minecraft/server";
import JSONObjectArgument from "./argument_types/JSONObjectArgument";
export default function ArgumentParser(arg, type) {
    if (arg == undefined) {
        return undefined;
    }
    if (type === Player) {
        const player = world.getPlayers({ name: arg.replace("@", "").replace(/\"+/g, '') })[0];
        console.warn(player);
        if (!player) {
            throw {
                translate: "commands.generic.noTargetMatch",
            };
        }
        return player;
    }
    else if (type === Number) {
        const parsed = parseFloat(arg);
        if (isNaN(parsed)) {
            throw {
                translate: "commands.generic.num.invalid",
                with: [arg],
            };
        }
        return parsed;
    }
    else if (type === Boolean) {
        if (arg.toLowerCase() === "true" || arg.toLowerCase() === "false") {
            return arg.toLowerCase() === "true";
        }
        else {
            throw {
                translate: "commands.generic.boolean.invalid",
                with: [arg],
            };
        }
    }
    else if (type === String) {
        return arg;
    }
    else if (type == JSONObjectArgument) {
        try {
            return JSON.parse(arg);
        }
        catch {
            throw { translate: "commands.tellraw.jsonException", with: [arg] };
        }
    }
}
//# sourceMappingURL=ArgumentParser.js.map