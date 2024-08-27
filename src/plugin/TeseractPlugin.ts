import {
    WorldInitializeBeforeEvent,
} from "@minecraft/server";
import Teseract from "../Teseract";

interface ITeseractPlugin {
    onLoaded?(): void;
    onEnabled?(initializer: WorldInitializeBeforeEvent): void;
    
}

/**
 * Represents a Teseract API plugin, this class may be extended by the plugin class for it to be valid.
 */
export default abstract class TeseractPlugin implements ITeseractPlugin {
    public static PLUGIN_ID: string;
    public getEventManager() {
        try {
            return Teseract.getEventManager();
        } catch (error) {
            LOGGER.error(error);
        }
    }

    public getCommandManager() {
        try {
            return Teseract.getCommanManager();
        } catch (error) {
            LOGGER.error(error, error.stack);
        }
    }

    public onLoaded(): void {}

    public onEnabled(initializer: WorldInitializeBeforeEvent): void {}
}
