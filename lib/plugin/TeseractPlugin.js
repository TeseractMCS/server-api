import Teseract from "../Teseract";
/**
 * Represents a Teseract API plugin, this class may be extended by the plugin class for it to be valid.
 */
class TeseractPlugin {
    getEventManager() {
        try {
            return Teseract.getEventManager();
        }
        catch (error) {
            LOGGER.error(error);
        }
    }
    getCommandManager() {
        try {
            return Teseract.getCommanManager();
        }
        catch (error) {
            LOGGER.error(error, error.stack);
        }
    }
    onLoaded() { }
    onEnabled(initializer) { }
}
export default TeseractPlugin;
//# sourceMappingURL=TeseractPlugin.js.map