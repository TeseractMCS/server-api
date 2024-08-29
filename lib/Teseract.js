import "./entity/Entity";
import "./entity/Player";
import { system, WorldInitializeBeforeEvent } from "@minecraft/server";
import CommandManager from "./command/CommandManager";
import EventManager from "./event/EventManager";
import Logger from "./Logger";
import EventHandler from "./event/EventHandler";
globalThis.LOGGER = new Logger();
Object.seal(globalThis.LOGGER);
const Plugins = [];
/**
 *
 */
export default class Teseract {
    static getLogger(pluginId) {
        return new Logger(pluginId);
    }
    ;
    static getCurrentTick() {
        system.currentTick;
    }
    static getEventManager() {
        return EventManager;
    }
    static getCommanManager() {
        return CommandManager;
    }
    /**
     * Register a new API plugin for modifying the Minecraft environment
     * @param plugin Registered plugin instance
     * @param pluginName Registered plugin name
     */
    static registerPlugin(plugin, pluginName) {
        try {
            // if (!(plugin instanceof TeseractPlugin)) {
            //     throw new Error(
            //         "Plugin " +
            //             // @ts-ignore
            //             plugin.constructor.name +
            //             " is not a a derived class of TeseractPlugin",
            //     );
            // }
            Plugins.push({ plugin: plugin, name: pluginName });
            if (typeof plugin?.onLoaded === "function") {
                plugin?.onLoaded();
            }
        }
        catch (error) {
            LOGGER.error(error, error.stack);
        }
    }
    static onWorldInitialized(event) {
        for (const plugin of Plugins) {
            try {
                plugin.plugin?.onEnabled(event);
            }
            catch (error) {
                LOGGER.error(error);
            }
        }
    }
}
__decorate([
    EventHandler,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [WorldInitializeBeforeEvent]),
    __metadata("design:returntype", void 0)
], Teseract, "onWorldInitialized", null);
Teseract.getEventManager().registerEvents(Teseract);
//# sourceMappingURL=Teseract.js.map