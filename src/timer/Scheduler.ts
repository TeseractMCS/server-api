import { system } from "@minecraft/server";

export default abstract class Scheduler {
    public static runTaskLater(task: () => void, delay: number) {
        return system.runTimeout(task, delay);
    }
    
    public static cancelTask(task: number) {
        system.clearRun(task);
    }
}
