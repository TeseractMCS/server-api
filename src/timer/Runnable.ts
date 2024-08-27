import * as MinecraftServer from "@minecraft/server";

export default class Runnable {
    private cancelled: boolean;
    private id: number | undefined;
    private runningTimer: boolean;
    
    public constructor() {
        this.cancelled = false;
        this.id = undefined;
        this.runningTimer = false;
    }

    /**
     * Returns a boolean indicating if the task is cancelled or not.
     * @returns If the task is cancelled or not.
     */
    public isCancelled(): boolean {
        try {
            return this.cancelled;
        } catch (error: any) {
            throw error;
        }
    }

    /**
     * Attemps to cancel the current run of this runnable task.
     * This may NOT cancel the running of if run or runAsynchronously was called before.
     */
    public cancel() {
        try {
            if (!this.id) {
                throw new Error(
                    "Runnable ID is undefined. ¿Is it an internal error?",
                );
            }
            if (this.runningTimer || this.id != undefined) {
                MinecraftServer.system.clearRun(this.id as number);
                this.runningTimer = false;
                this.cancelled = true;
            }
        } catch (error: any) {
            console.warn(error, error.stack);
        }
    }

    /**
     * Returns the identifier of the internal server job. Identifier may change when running the task with different methods.
     * @returns Opaque internal MinecraftServer.system.runTimeout/runInterval identifier. This identifier will be overrided when running any run<Mode> method.
     */
    public getIdentifier(): number | undefined {
        try {
            return this.id;
        } catch (error: any) {
            console.warn(error, error.stack);
        }
    }

    /**
     * Runs this task on the next tick
     * @param args Optional persistent arguments
     */
    public runLater(delay: number, ...args: any[]): any {
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
            console.warn(error, error.stack);
        }
    }
    /**
     * Function that triggers when the runnable instance is executed
     */
    public onRun(...args: any[]) {}
    public *onRunJob(...args: any[]): Generator<void, void, void> {
    }
    /**
     * Runs this task on the next tick
     * @param args Optional persistent arguments
     */
    public run(...args: any[]): any {
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
            console.warn(error, error.stack);
        }
    }
    /**
     * Runs this task asynchronously on the next tick
     * @param args Optional persistent arguments
     */
    public async runAsynchronously(...args: any[]): Promise<any> {
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
    public runTimer(interval: number, delay?: number, ...args: any[]): any {
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
            console.warn(error, error.stack);
        }
    }
}
