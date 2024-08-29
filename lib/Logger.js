const Color = {
    Red: "§c",
    Reset: "§r",
};
export default class Logger {
    constructor(pluginId = "system", emitDebugLogs = false, emitRobustDebugLogs = false) {
        this.pluginId = pluginId;
        this.emitDebugLogs = emitDebugLogs;
        this.emitRobustDebugLogs = emitRobustDebugLogs;
    }
    getPluginIdentifier() {
        return this.pluginId;
    }
    log(message, ...data) {
        if (message instanceof Error) {
            return console.warn(`[${this.getPluginIdentifier()}] [log]`, message, message.stack);
        }
        console.warn(`[${this.getPluginIdentifier()}] [log]`, message, Color.Reset, ...data);
    }
    info(message, ...data) {
        if (message instanceof Error) {
            return console.warn(`[${this.getPluginIdentifier()}] [info]`, message, message.stack);
        }
        console.warn(`[${this.getPluginIdentifier()}] [info]`, message, Color.Reset, ...data);
    }
    warn(message, ...data) {
        if (message instanceof Error) {
            return console.warn(`[${this.getPluginIdentifier()}] [warning]`, message, message.stack);
        }
        console.warn(`[${this.getPluginIdentifier()}] [warning]`, message, Color.Reset, ...data);
    }
    error(message, ...data) {
        if (message instanceof Error) {
            return console.warn(`[${this.getPluginIdentifier()}] [error]`, message, message.stack);
        }
        console.warn(`[${this.getPluginIdentifier()}] [error]`, message, ...data);
    }
    debug(message, ...data) {
        if (this.emitDebugLogs) {
            if (message instanceof Error) {
                return console.warn(`[${this.getPluginIdentifier()}] [debug]`, message, message.stack);
            }
            console.warn(`[${this.getPluginIdentifier()}] [debug]`, message, Color.Reset, ...data);
        }
    }
    critical(message, ...data) {
        if (message instanceof Error) {
            return console.warn(`[${this.getPluginIdentifier()}] [error] [critical]`, message, message.stack);
        }
        console.warn(`[${this.getPluginIdentifier()}] [error] [critical]`, message, Color.Reset, ...data);
    }
    robust(message, ...data) {
        if (this.emitRobustDebugLogs) {
            if (message instanceof Error) {
                return console.warn(`[${this.getPluginIdentifier()}] [debug] [robust]`, message, message.stack);
            }
            console.warn(`[${this.getPluginIdentifier()}] [debug] [robust]`, message, Color.Reset, ...data);
        }
    }
}
//# sourceMappingURL=Logger.js.map