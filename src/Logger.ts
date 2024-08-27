const Color = {
    Red: "§c",
    Reset: "§r",
};
export default class Logger {
    #pluginId: string;
    #emitDebugLogs: boolean;
    #emitRobustDebugLogs: boolean;
    public constructor(
        pluginId: string = "system",
        emitDebugLogs: boolean = false,
        emitRobustDebugLogs: boolean = false,
    ) {
        this.#pluginId = pluginId;
        this.#emitDebugLogs = emitDebugLogs;
        this.#emitRobustDebugLogs = emitRobustDebugLogs;
    }

    public getPluginIdentifier() {
        return this.#pluginId;
    }

    public log(message: any, ...data: any[]) {
        if (message instanceof Error) {
            return console.warn(
                `[${this.getPluginIdentifier()}] [log]`,
                message,
                message.stack,
            );
        }
        console.warn(
            `[${this.getPluginIdentifier()}] [log]`,
            message,
            Color.Reset,
            ...data,
        );
    }

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
            Color.Reset,
            ...data,
        );
    }

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
            Color.Reset,
            ...data,
        );
    }

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

    public debug(message: any, ...data: any[]) {
        if (this.#emitDebugLogs) {
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
                Color.Reset,
                ...data,
            );
        }
    }

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
                Color.Reset,
                ...data,
            );
    }

    public robust(message: any, ...data: any[]) {
        if (this.#emitRobustDebugLogs) {
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
                Color.Reset,
                ...data,
            );
        }
    }
}
