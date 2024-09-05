import { system } from "@minecraft/server";
abstract class Scheduler {
    public static async sleep(ticks: number) {
        return system.waitTicks(ticks);
    }

    public static runTaskLater(
        callback: (...args: any[]) => void,
        delay?: 1 | number,
        ...args: any[]
    ): number {
        try {
            const ev = system.runTimeout(() => {
                callback(args);
            }, delay);
            return ev;
        } catch (error: any) {
            LOGGER.error(error, error.stack);
        }
    }

    public static runTaskTimer(
        callback: (...args: any[]) => void,
        delay?: 1 | number,
        ...args: any[]
    ): number {
        try {
            const ev = system.runInterval(() => {
                callback(args);
            }, delay);
            return ev;
        } catch (error: any) {
            LOGGER.error(error, error.stack);
        }
    }

    public static cancelTask(taskId: number): void {
        try {
            system.clearRun(taskId);
        } catch (error: any) {
            LOGGER.error(error, error.stack);
        }
    }
}

export default Scheduler;
