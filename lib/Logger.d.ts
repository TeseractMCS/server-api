export default class Logger {
    private pluginId;
    private emitDebugLogs;
    private emitRobustDebugLogs;
    constructor(pluginId?: string, emitDebugLogs?: boolean, emitRobustDebugLogs?: boolean);
    getPluginIdentifier(): string;
    log(message: any, ...data: any[]): void;
    info(message: any, ...data: any[]): void;
    warn(message: any, ...data: any[]): void;
    error(message: any, ...data: any[]): void;
    debug(message: any, ...data: any[]): void;
    critical(message: any, ...data: any[]): void;
    robust(message: any, ...data: any[]): void;
}
