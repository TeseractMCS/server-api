import "./entity/Entity";
import "./entity/Player";
import { system } from "@minecraft/server";
import CommandManager from "./command/CommandManager";
import EventManager from "./event/EventManager";
import Logger from "./Logger";

globalThis.LOGGER = new Logger();
Object.seal(globalThis.LOGGER)
declare global {
    /**
     * A {@link console} object extension for internal @teseract/server-api logging. 
     * @remarks This object is usable anywhere, but {@link Logger.getPluginIdentifier} will always be "system"
     */
    var LOGGER: Logger;
}

/**
 *
 */
export default abstract class Teseract {
    public static getCurrentTick() {
        system.currentTick;
    }

    public static getEventManager() {
        return EventManager;
    }

    public static getCommanManager() {
        return CommandManager;
    }
}
