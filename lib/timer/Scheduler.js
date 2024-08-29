import { system } from "@minecraft/server";
export default class Scheduler {
    static runTaskLater(task, delay) {
        return system.runTimeout(task, delay);
    }
    static cancelTask(task) {
        system.clearRun(task);
    }
}
//# sourceMappingURL=Scheduler.js.map