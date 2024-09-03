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
        /**
         * Indicates if the message is a command.
         */
        readonly isCommand: boolean;
    }
}

/**
 * Manages commands within the game, including handling command events and storing registered commands.
 */
class CommandManager {
    private static readonly commands: InstanceType<any>[] = [];

    /**
     * Gets the prefix used for commands.
     * Defaults to "-" if not set in the dynamic properties.
     * @returns The command prefix.
     */
    public static get prefix(): string {
        let prefix = world.getDynamicProperty(
            Identifier.of("system", "command_prefix").toString(),
        ) as string;
        if (prefix === undefined) {
            prefix = "-";
        }
        return prefix;
    }

    @EventHandler
    private static onCommandAfterSent(event: ChatSendAfterEvent) {
        if (!event.message.startsWith(this.prefix)) {
            // @ts-ignore
            event.isCommand = false;
            return;
        }
        // @ts-ignore
        event.isCommand = true;
    }

    @EventHandler
    private static onCommandSent(event: ChatSendBeforeEvent) {
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

    /**
     * Retrieves the list of registered commands.
     * @returns An array of registered command instances.
     */
    public static getCommands() {
        return this.commands;
    }
    
    /**
     * Registers a bundle commands by adding its class instance to the list of commands.
     * @param commandClasses - The class instances of the commands to register.
     */
    public static registerCommands(...commandClasses: InstanceType<any>[]) {
        for (const command of commandClasses) {
            this.commands.push(command);
        }
    }
}

export default CommandManager;

EventManager.registerEvents(CommandManager);
