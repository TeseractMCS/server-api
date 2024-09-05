import { system, WorldInitializeBeforeEvent } from "@minecraft/server";
import CommandManager from "./command/CommandManager";
import EventManager from "./event/EventManager";
import Logger from "./Logger";
import TeseractPlugin from "./plugin/TeseractPlugin";
import EventHandler from "./event/EventHandler";

const Plugins: { name: string; plugin: TeseractPlugin }[] = [];

/**
 *
 */
abstract class Teseract {
    public static MaxTickRange = 20000000;

    public static getLogger(pluginId: string): Logger {
        return new Logger(pluginId);
    }

    public static getCurrentTick(): number {
        return system.currentTick;
    }

    public static getEventManager(): typeof EventManager {
        return EventManager;
    }

    public static getCommandManager(): typeof CommandManager {
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
                        (plugin as any).constructor.name +
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

export default Teseract;
