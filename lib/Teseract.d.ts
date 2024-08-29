import "./entity/Entity";
import "./entity/Player";
import CommandManager from "./command/CommandManager";
import EventManager from "./event/EventManager";
import Logger from "./Logger";
import TeseractPlugin from "./plugin/TeseractPlugin";
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
    static getLogger(pluginId: string): Logger;
    static getCurrentTick(): void;
    static getEventManager(): typeof EventManager;
    static getCommanManager(): typeof CommandManager;
    /**
     * Register a new API plugin for modifying the Minecraft environment
     * @param plugin Registered plugin instance
     * @param pluginName Registered plugin name
     */
    static registerPlugin<T extends TeseractPlugin>(plugin: T, pluginName: string): void;
    private static onWorldInitialized;
}
