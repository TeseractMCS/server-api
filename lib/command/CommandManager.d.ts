import "reflect-metadata";
import { ChatSendAfterEvent, ChatSendBeforeEvent } from "@minecraft/server";
declare module "@minecraft/server" {
    interface ChatSendBeforeEvent {
        readonly isCommand: boolean;
    }
}
export default class CommandManager {
    private static readonly commands;
    static get prefix(): string;
    static onCommandAfterSent(event: ChatSendAfterEvent): void;
    static onCommandSent(event: ChatSendBeforeEvent): void;
    static getCommands(): any[];
    static registerCommand(commandClass: InstanceType<any>): void;
}
