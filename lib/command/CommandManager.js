import "reflect-metadata";
import CommandHandler from "./CommandHandler";
import EventHandler from "../event/EventHandler";
import { ChatSendAfterEvent, ChatSendBeforeEvent, world, } from "@minecraft/server";
import EventManager from "../event/EventManager";
import Identifier from "../util/Identifier";
class CommandManager {
    static get prefix() {
        let prefix = world.getDynamicProperty(Identifier.of("system", "command_prefix").toString());
        if (prefix == undefined) {
            prefix = "-";
        }
        return prefix;
    }
    static onCommandAfterSent(event) {
        if (!event.message.startsWith(this.prefix)) {
            // @ts-ignore
            event.isCommand = false;
            return;
        }
        // @ts-ignore
        event.isCommand = true;
    }
    static onCommandSent(event) {
        if (!event.message.startsWith(this.prefix)) {
            // @ts-ignore
            event.isCommand = false;
            return;
        }
        // @ts-ignore
        event.isCommand = true;
        event.cancel = true;
        let regex = /(@[aepsr]\[|@"[^"]*"|"[^"]*"|\[[^\]]*\]|\S+)/g;
        const [command, ...parameters] = event.message.match(regex);
        const processedParameters = parameters.map((param) => {
            if (param.startsWith('"') && param.endsWith('"')) {
                return param.slice(1, -1);
            }
            return param;
        });
        try {
            CommandHandler(event.sender, command.substring(this.prefix.length), ...processedParameters);
        }
        catch (error) {
            console.error(error, error.stack);
        }
    }
    static getCommands() {
        return this.commands;
    }
    static registerCommand(commandClass) {
        this.commands.push(commandClass);
    }
}
CommandManager.commands = [];
export default CommandManager;
__decorate([
    EventHandler,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ChatSendAfterEvent]),
    __metadata("design:returntype", void 0)
], CommandManager, "onCommandAfterSent", null);
__decorate([
    EventHandler,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ChatSendBeforeEvent]),
    __metadata("design:returntype", void 0)
], CommandManager, "onCommandSent", null);
EventManager.registerEvents(CommandManager);
//# sourceMappingURL=CommandManager.js.map