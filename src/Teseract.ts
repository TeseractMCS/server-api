import "./entity/Entity";
import "./entity/Player";
import { system, WorldInitializeBeforeEvent } from "@minecraft/server";
import CommandManager from "./command/CommandManager";
import EventManager from "./event/EventManager";
import Logger from "./Logger";
import TeseractPlugin from "./plugin/TeseractPlugin";
import EventHandler from "./event/EventHandler";

globalThis.LOGGER = new Logger();
Object.seal(globalThis.LOGGER);
declare global {
    /**
     * A {@link console} object extension for internal @teseract/server-api logging.
     * @remarks This object is usable anywhere, but {@link Logger.getPluginIdentifier} will always be "system"
     */
    var LOGGER: Logger;
}

const Plugins: { name: string; plugin: TeseractPlugin }[] = [];
/**
 *
 */
export default abstract class Teseract {
    public static getLogger(pluginId: string) {
        return new Logger(pluginId)
    };

    public static getCurrentTick() {
        system.currentTick;
    }

    public static getEventManager(): typeof EventManager {
        return EventManager;
    }

    public static getCommanManager(): typeof CommandManager {
        return CommandManager;
    }

    /**
     * Register a new API plugin for modifying the Minecraft environment
     * @param plugin Registered plugin instance
     * @param pluginName Registered plugin name
     */
    public static registerPlugin<T extends TeseractPlugin>(
        plugin: T,
        pluginName: string,
    ): void {
        try {
            if (!(plugin instanceof TeseractPlugin)) {
                throw new Error(
                    "Plugin " +
                        // @ts-ignore
                        plugin.constructor.name +
                        " is not a a derived class of TeseractPlugin",
                );
            }
            Plugins.push({ plugin: plugin, name: pluginName });
            if (typeof plugin?.onLoaded === "function") {
                plugin?.onLoaded();
            }
        } catch (error: any) {
            LOGGER.error(error, error.stack);
        }
    }

    @EventHandler
    private static onWorldInitialized(event: WorldInitializeBeforeEvent) {
        for (const plugin of Plugins) {
            try {
                plugin.plugin?.onEnabled(event);
            } catch (error) {
                LOGGER.error(error);
            }
        }
    }
}

Teseract.getEventManager().registerEvents(Teseract);
