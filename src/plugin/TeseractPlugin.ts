import { WorldInitializeBeforeEvent } from "@minecraft/server";
import Teseract from "../Teseract";

/**
 * Represents a Teseract API plugin. This class may be extended by plugin classes to be valid.
 *
 * @interface ITeseractPlugin
 */
interface ITeseractPlugin {
    /**
     * Called when the plugin is loaded. Optional method that can be overridden.
     */
    onLoaded?(): void;

    /**
     * Called when the plugin is enabled. This method receives the world initialization event.
     *
     * @param initializer - The world initialization event.
     */
    onEnabled?(initializer: WorldInitializeBeforeEvent): void;
}

/**
 * Abstract class representing a Teseract API plugin. Provides methods to access Teseract managers
 * and event handling capabilities. Should be extended by plugin implementations.
 */
abstract class TeseractPlugin implements ITeseractPlugin {
    /**
     * The unique identifier for the plugin.
     *
     * @static
     */
    public static PLUGIN_ID: string;

    /**
     * Retrieves the event manager from the Teseract instance.
     *
     * @returns The event manager instance.
     */
    public getEventManager() {
        try {
            return Teseract.getEventManager();
        } catch (error) {
            LOGGER.error(error);
        }
    }

    /**
     * Retrieves the command manager from the Teseract instance.
     *
     * @returns The command manager instance.
     */
    public getCommandManager() {
        try {
            return Teseract.getCommandManager();
        } catch (error) {
            LOGGER.error(error, error.stack);
        }
    }

    /**
     * Called when the plugin is loaded. This is an optional method that can be overridden.
     */
    public onLoaded(): void {}

    /**
     * Called when the plugin is enabled. This method receives the world initialization event.
     *
     * @param initializer - The world initialization event data.
     */
    public onEnabled(initializer: WorldInitializeBeforeEvent): void {}
}

export default TeseractPlugin;
