import { WorldInitializeBeforeEvent } from "@minecraft/server";
interface ITeseractPlugin {
    onLoaded?(): void;
    onEnabled?(initializer: WorldInitializeBeforeEvent): void;
}
/**
 * Represents a Teseract API plugin, this class may be extended by the plugin class for it to be valid.
 */
declare abstract class TeseractPlugin implements ITeseractPlugin {
    static PLUGIN_ID: string;
    getEventManager(): typeof import("../event/EventManager").default;
    getCommandManager(): typeof import("../command/CommandManager").default;
    onLoaded(): void;
    onEnabled(initializer: WorldInitializeBeforeEvent): void;
}
export default TeseractPlugin;
