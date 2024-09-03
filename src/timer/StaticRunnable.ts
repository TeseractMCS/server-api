import * as MinecraftServer from "@minecraft/server";

/**
 * A class representing a runnable task that can be scheduled to run at a later time or on a recurring basis.
 * This specific implementation of Runnable is intended for using with only static members.
 */
abstract class StaticRunnable {
    private static cancelled: boolean;
    private static id: number | undefined;
    private static runningTimer: boolean;

    /**
     * Creates an instance of the Runnable class.
     */
    public constructor() {
        StaticRunnable.cancelled = false;
        StaticRunnable.id = undefined;
        StaticRunnable.runningTimer = false;
    }

    /**
     * Returns a boolean indicating if the task is cancelled or not.
     *
     * @returns If the task is cancelled or not.
     */
    public static isCancelled(): boolean {
        try {
            return this.cancelled;
        } catch (error: any) {
            throw error;
        }
    }

    /**
     * Attempts to cancel the current run of this runnable task.
     * This may NOT cancel the running task if `run` or `runAsynchronously` was called before.
     */
    public static cancel() {
        try {
            if (!this.id) {
                throw new Error(
                    "Runnable ID is undefined. Is it an internal error?",
                );
            }
            if (this.runningTimer || this.id != undefined) {
                MinecraftServer.system.clearRun(this.id as number);
                this.runningTimer = false;
                this.cancelled = true;
            }
        } catch (error: any) {
            LOGGER.error(error);
        }
    }

    /**
     * Returns the identifier of the internal server job. The identifier may change when running the task with different methods.
     *
     * @returns Opaque internal MinecraftServer.system.runTimeout/runInterval identifier. This identifier will be overridden when running any run<Mode> method.
     */
    public static getIdentifier(): number | undefined {
        try {
            return this.id;
        } catch (error: any) {
            LOGGER.error(error);
        }
    }

    /**
     * Runs this task on the next tick with an optional delay.
     *
     * @param delay The delay in ticks before the task runs. Must be an integer.
     * @param args Optional persistent arguments.
     */
    public static runLater(delay: number, ...args: any[]): any {
        try {
            if (this.runningTimer) {
                throw new Error(
                    "A runnable task timer is already running on this task",
                );
            }
            if (!Number.isInteger(delay)) {
                throw new TypeError(
                    "Delay argument must be a fixed point number (integer)",
                );
            }
            this.id = MinecraftServer.system.runTimeout(() => {
                this.onRun(args);
            }, delay);
        } catch (error: any) {
            LOGGER.error(error);
        }
    }

    /**
     * Function that triggers when the runnable instance is executed.
     *
     * @param args Optional arguments passed to the function when executed.
     */
    public static onRun(...args: any[]) {}

    /**
     * Function that triggers when the runnable instance is executed as a generator job.
     *
     * @param args Optional arguments passed to the function when executed.
     * @returns A generator yielding void.
     */
    public static *onRunJob(...args: any[]): Generator<void, void, void> {}

    /**
     * Runs this task on the next tick.
     *
     * @param args Optional persistent arguments.
     */
    public static run(...args: any[]): any {
        try {
            if (this.runningTimer) {
                throw new Error(
                    "A runnable task timer is already running on this task",
                );
            }
            this.cancelled = false;
            MinecraftServer.system.runTimeout(() => {
                this.onRun(args);
            }, 1);
        } catch (error: any) {
            LOGGER.error(error);
        }
    }

    /**
     * Runs this task asynchronously on the next tick.
     *
     * @param args Optional persistent arguments.
     * @returns A promise that resolves with the result of the onRun method.
     */
    public static async runAsynchronously(...args: any[]): Promise<any> {
        if (this.runningTimer) {
            throw new Error(
                "A runnable task timer is already running on this task",
            );
        }
        this.cancelled = false;
        return new Promise((resolve, reject) => {
            try {
                MinecraftServer.system.runTimeout(() => {
                    const val = this.onRun(args);
                    resolve(val);
                }, 1);
            } catch (error: any) {
                reject(`${error}, ${error.stack}`);
            }
        });
    }

    /**
     * Runs this task on a recurring interval.
     *
     * @param interval The interval in ticks between executions. Must be an integer.
     * @param delay Optional delay before the first execution. Must be an integer.
     * @param args Optional persistent arguments.
     */
    public static runTimer(
        interval: number,
        delay?: number,
        ...args: any[]
    ): any {
        try {
            if (!Number.isInteger(interval)) {
                throw new TypeError(
                    "Interval argument must be a fixed point number (integer)",
                );
            }
            if (!Number.isInteger(delay) && delay != undefined) {
                throw new TypeError(
                    "Delay argument must be a fixed point number (integer)",
                );
            }
            if (this.runningTimer == true && this.cancelled != false) {
                return;
            }
            this.runningTimer = true;
            this.cancelled = false;
            this.id = MinecraftServer.system.runInterval(() => {
                try {
                    if (delay == 0 || !delay) {
                        this.onRun(args);
                        MinecraftServer.system.runJob(this.onRunJob());
                    } else {
                        MinecraftServer.system.runTimeout(() => {
                            this.onRun(args);
                            MinecraftServer.system.runJob(this.onRunJob());
                        }, delay);
                    }
                } catch (error) {
                    console.error(
                        "Error at runnable " + this.constructor.name,
                        error,
                        error.stack,
                    );
                }
            }, interval);
        } catch (error: any) {
            LOGGER.error(error);
        }
    }
}

export default StaticRunnable;
