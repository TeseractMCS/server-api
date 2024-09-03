import Logger from "./Logger";

globalThis.LOGGER = new Logger();
Object.seal(globalThis.LOGGER);

declare global {
    /**
     * A {@link console} object extension for internal \@teseract/server-api logging.
     * @remarks This object is usable anywhere, but {@link Logger.getPluginIdentifier} will always be "system"
     */
    var LOGGER: Logger;
}

import Teseract from "./Teseract";

import "./entity/Entity";
import "./entity/Player";

export { Teseract, Logger };

export * from "./command/index";
export * from "./event/index";
export * from "./inventory/index";
export * from "./plugin/index";
export * from "./timer/index";
export * from "./util/index";
export * from "./ui/index";
