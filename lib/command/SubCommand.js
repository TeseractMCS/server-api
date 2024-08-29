import SubCommandNester from "./SubCommandNester";
export default function SubCommand(subCommand) {
    return function (target, propertyKey, descriptor) {
        if (!descriptor) {
            throw new TypeError(`'${propertyKey}' is not a method, it cannot be tagged as SubCommand.`);
        }
        if (!target.constructor.__commandData) {
            target.constructor.__commandData = { subCommands: {} };
        }
        if (!target.constructor.__commandData.subCommands) {
            target.constructor.__commandData.subCommands = {};
        }
        SubCommandNester(target.constructor.__commandData.subCommands, subCommand.split(" "), target, propertyKey);
    };
}
//# sourceMappingURL=SubCommand.js.map