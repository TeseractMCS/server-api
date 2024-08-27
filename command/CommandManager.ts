import "reflect-metadata";
import CommandHandler from "./CommandHandler";
import EventHandler from "../event/EventHandler";
import {
    ChatSendAfterEvent,
    ChatSendBeforeEvent,
    world,
} from "@minecraft/server";
import EventManager from "../event/EventManager";
import Identifier from "../util/Identifier";

declare module "@minecraft/server" {
    interface ChatSendBeforeEvent {
        readonly isCommand: boolean;
    }
}

export default class CommandManager {
    private static readonly commands: InstanceType<any>[] = [];

    public static get prefix(): string {
        let prefix = world.getDynamicProperty(
            Identifier.of("system", "command_prefix").toString(),
        ) as string;
        if (prefix == undefined) {
            prefix = "-";
        }
        return prefix;
    }

    @EventHandler
    public static onCommandAfterSent(event: ChatSendAfterEvent) {
        if (!event.message.startsWith(this.prefix)) {
            // @ts-ignore
            event.isCommand = false;
            return;
        }
        // @ts-ignore
        event.isCommand = true;
    }

    @EventHandler
    public static onCommandSent(event: ChatSendBeforeEvent) {
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
            CommandHandler(
                event.sender,
                command.substring(this.prefix.length),
                ...processedParameters,
            );
        } catch (error) {
            console.error(error, error.stack);
        }
    }

    public static getCommands() {
        return this.commands;
    }

    public static registerCommand(commandClass: InstanceType<any>) {
        this.commands.push(commandClass);
    }
}

EventManager.registerEvents(CommandManager);
