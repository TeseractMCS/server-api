export default class Runnable {
    private cancelled;
    private id;
    private runningTimer;
    constructor();
    /**
     * Returns a boolean indicating if the task is cancelled or not.
     * @returns If the task is cancelled or not.
     */
    isCancelled(): boolean;
    /**
     * Attemps to cancel the current run of this runnable task.
     * This may NOT cancel the running of if run or runAsynchronously was called before.
     */
    cancel(): void;
    /**
     * Returns the identifier of the internal server job. Identifier may change when running the task with different methods.
     * @returns Opaque internal MinecraftServer.system.runTimeout/runInterval identifier. This identifier will be overrided when running any run<Mode> method.
     */
    getIdentifier(): number | undefined;
    /**
     * Runs this task on the next tick
     * @param args Optional persistent arguments
     */
    runLater(delay: number, ...args: any[]): any;
    /**
     * Function that triggers when the runnable instance is executed
     */
    onRun(...args: any[]): void;
    onRunJob(...args: any[]): Generator<void, void, void>;
    /**
     * Runs this task on the next tick
     * @param args Optional persistent arguments
     */
    run(...args: any[]): any;
    /**
     * Runs this task asynchronously on the next tick
     * @param args Optional persistent arguments
     */
    runAsynchronously(...args: any[]): Promise<any>;
    runTimer(interval: number, delay?: number, ...args: any[]): any;
}
