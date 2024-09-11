/**
 * A logging utility class that provides various methods for logging messages with different severity levels.
 */
class Logger {
    private pluginId: string;
    private emitDebugLogs: boolean;
    private emitRobustDebugLogs: boolean;

    /**
     * Creates an instance of the Logger class.
     *
     * @param pluginId The identifier for the plugin or component using this logger. Defaults to "system".
     * @param emitDebugLogs Whether to emit debug logs. Defaults to false.
     * @param emitRobustDebugLogs Whether to emit robust debug logs. Defaults to false.
     */
    public constructor(
        pluginId: string = "system",
        emitDebugLogs: boolean = false,
        emitRobustDebugLogs: boolean = false,
    ) {
        this.pluginId = pluginId;
        this.emitDebugLogs = emitDebugLogs;
        this.emitRobustDebugLogs = emitRobustDebugLogs;
    }

    /**
     * Gets the plugin identifier used by this logger.
     *
     * @returns The plugin identifier.
     */
    public getPluginIdentifier() {
        return this.pluginId;
    }

    /**
     * Logs a message with "log" level.
     *
     * @param message The message to log. If an Error, it will include the stack trace.
     * @param data Additional data to log.
     */
    public log(message: any, ...data: any[]) {
        if (message instanceof Error) {
            return console.warn(
                `[${this.getPluginIdentifier()}] [log]`,
                message,
                message.stack,
            );
        }
        console.warn(`[${this.getPluginIdentifier()}] [log]`, message, ...data);
    }

    /**
     * Logs a message with "info" level.
     *
     * @param message The message to log. If an Error, it will include the stack trace.
     * @param data Additional data to log.
     */
    public info(message: any, ...data: any[]) {
        if (message instanceof Error) {
            return console.warn(
                `[${this.getPluginIdentifier()}] [info]`,
                message,
                message.stack,
            );
        }
        console.warn(
            `[${this.getPluginIdentifier()}] [info]`,
            message,
            ...data,
        );
    }

    /**
     * Logs a message with "warning" level.
     *
     * @param message The message to log. If an Error, it will include the stack trace.
     * @param data Additional data to log.
     */
    public warn(message: any, ...data: any[]) {
        if (message instanceof Error) {
            return console.warn(
                `[${this.getPluginIdentifier()}] [warning]`,
                message,
                message.stack,
            );
        }
        console.warn(
            `[${this.getPluginIdentifier()}] [warning]`,
            message,
            ...data,
        );
    }

    /**
     * Logs a message with "error" level.
     *
     * @param message The message to log. If an Error, it will include the stack trace.
     * @param data Additional data to log.
     */
    public error(message: any, ...data: any[]) {
        if (message instanceof Error) {
            return console.warn(
                `[${this.getPluginIdentifier()}] [error]`,
                message,
                message.stack,
            );
        }
        console.warn(
            `[${this.getPluginIdentifier()}] [error]`,
            message,
            ...data,
        );
    }

    /**
     * Logs a message with "debug" level if debug logs are enabled.
     *
     * @param message The message to log. If an Error, it will include the stack trace.
     * @param data Additional data to log.
     */
    public debug(message: any, ...data: any[]) {
        if (this.emitDebugLogs) {
            if (message instanceof Error) {
                return console.warn(
                    `[${this.getPluginIdentifier()}] [debug]`,
                    message,
                    message.stack,
                );
            }
            console.warn(
                `[${this.getPluginIdentifier()}] [debug]`,
                message,
                ...data,
            );
        }
    }

    /**
     * Logs a message with "critical" error level.
     *
     * @param message The message to log. If an Error, it will include the stack trace.
     * @param data Additional data to log.
     */
    public critical(message: any, ...data: any[]) {
        if (message instanceof Error) {
            return console.warn(
                `[${this.getPluginIdentifier()}] [error] [critical]`,
                message,
                message.stack,
            );
        }
        console.warn(
            `[${this.getPluginIdentifier()}] [error] [critical]`,
            message,
            ...data,
        );
    }

    /**
     * Logs a message with "robust debug" level if robust debug logs are enabled.
     *
     * @param message The message to log. If an Error, it will include the stack trace.
     * @param data Additional data to log.
     */
    public robust(message: any, ...data: any[]) {
        if (this.emitRobustDebugLogs) {
            if (message instanceof Error) {
                return console.warn(
                    `[${this.getPluginIdentifier()}] [debug] [robust]`,
                    message,
                    message.stack,
                );
            }
            console.warn(
                `[${this.getPluginIdentifier()}] [debug] [robust]`,
                message,
                ...data,
            );
        }
    }
}


globalThis.LOGGER = new Logger();
Object.seal(globalThis.LOGGER);

export default Logger;
