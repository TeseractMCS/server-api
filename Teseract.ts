import "./entity/Entity";
import "./entity/Player";
import { system } from "@minecraft/server";
import CommandManager from "./command/CommandManager";
import EventManager from "./event/EventManager";

/**
 *
 */
abstract class Teseract {
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
