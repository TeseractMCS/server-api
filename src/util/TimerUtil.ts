import * as MinecraftServer from "@minecraft/server";
import Logger from "../Logger";

export default class TimerUtil {
    private LOGGER = new Logger();
    public static runLater(callback: Function, tickDelay: number) {
        (async () => {
            await this.sleep(tickDelay);
            callback();
        })();
    }
    public static MaxTickRange = 20000000;

    public static parseDate(seconds: number) {
        const years = Math.floor(seconds / (365 * 24 * 3600));
        seconds %= 365 * 24 * 3600;
        const months = Math.floor(seconds / (30 * 24 * 3600));
        seconds %= 30 * 24 * 3600;
        const weeks = Math.floor(seconds / (7 * 24 * 3600));
        seconds %= 7 * 24 * 3600;
        const days = Math.floor(seconds / (24 * 3600));
        seconds %= 24 * 3600;
        const hours = Math.floor(seconds / 3600);
        seconds %= 3600;
        const minutes = Math.floor(seconds / 60);
        seconds %= 60;

        const timeUnits = [
            { value: years, label: "y" },
            { value: months, label: "m" },
            { value: weeks, label: "w" },
            { value: days, label: "d" },
            { value: hours, label: "h" },
            { value: minutes, label: "min" },
            { value: seconds, label: "s" },
        ];

        let result = "";
        let count = 0;

        for (const unit of timeUnits) {
            if (unit.value > 0) {
                result += `${unit.value} ${unit.label} `;
                count++;
                if (count === 2) break;
            }
        }

        return result.trim();
    }

    public static dateToSeconds(timeString: string) {
        const matches = timeString.match(/(\d+)([dhms])/g) || ([] as string[]);
        let totalSeconds = 0;

        matches.forEach((match) => {
            const value = parseInt(match);
            const unit = match.slice(-1);
            switch (unit) {
                case "d":
                    totalSeconds += value * 24 * 60 * 60;
                    break;
                case "h":
                    totalSeconds += value * 60 * 60;
                    break;
                case "m":
                    totalSeconds += value * 60;
                    break;
                case "s":
                    totalSeconds += value;
                    break;
                default:
                    totalSeconds += value;
            }
        });

        if (matches == null || matches.length == 0) {
            timeString.match(/\d+/).forEach((val) => {
                const secs = parseInt(val);
                totalSeconds += isNaN(secs) ? 0 : secs;
            });
        }

        return totalSeconds;
    }

    /**
     * Converts seconds to a formatted time public string (HH:MM:SS).
     * @param {number} seconds - The total number of seconds to convert.
     * @returns {string} The formatted time string.
     * @remarks Pads single digit hours, minutes, and seconds with a leading zero.
     */
    public static parseTime(seconds: number): string {
        const padWithZero = (value: number) =>
            value.toString().padStart(2, "0");
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return `${padWithZero(hours)}:${padWithZero(minutes)}:${padWithZero(
            remainingSeconds,
        )}`;
    }

    /**
     * Converts hours to seconds.
     * @param {number} hours - The number of hours to convert.
     * @returns {number} The equivalent number of seconds.
     * @remarks 1 hour is equal to 3600 seconds.
     */
    public static fromHoursToSeconds(hours: number): number {
        return hours * 3600;
    }

    /**
     * Converts minutes to seconds.
     * @param {number} minutes - The number of minutes to convert.
     * @returns {number} The equivalent number of seconds.
     * @remarks 1 minute is equal to 60 seconds.
     */
    public static fromMinutesToSeconds(minutes: number): number {
        return minutes * 60;
    }

    /**
     * Converts days to seconds.
     * @param {number} days - The number of days to convert.
     * @returns {number} The equivalent number of seconds.
     * @remarks 1 day is equal to 86400 seconds.
     */
    public static fromDaysToSeconds(days: number): number {
        return days * 86400;
    }

    /**
     * Converts milliseconds to seconds.
     * @param {number} milliseconds - The number of milliseconds to convert.
     * @returns {number} The equivalent number of seconds.
     * @remarks 1000 milliseconds are equal to 1 second.
     */
    public static fromMillisecondsToSeconds(milliseconds: number): number {
        return milliseconds / 1000;
    }

    /**
     * Converts Minecraft ticks to seconds.
     * @param {number} ticks - The number of Minecraft ticks to convert.
     * @returns {number} The equivalent number of seconds.
     * @remarks 20 Minecraft ticks are equal to 1 second.
     */
    public static fromTicksToSeconds(ticks: number): number {
        return ticks / 20;
    }

    /**
     * Converts seconds to hours.
     * @param {number} seconds - The number of seconds to convert.
     * @returns {number} The equivalent number of hours.
     * @remarks 3600 seconds are equal to 1 hour.
     */
    public static fromSecondsToHours(seconds: number): number {
        return seconds / 3600;
    }

    /**
     * Converts seconds to minutes.
     * @param {number} seconds - The number of seconds to convert.
     * @returns {number} The equivalent number of minutes.
     * @remarks 60 seconds are equal to 1 minute.
     */
    public static fromSecondsToMinutes(seconds: number): number {
        return seconds / 60;
    }

    /**
     * Converts seconds to days.
     * @param {number} seconds - The number of seconds to convert.
     * @returns {number} The equivalent number of days.
     * @remarks 86400 seconds are equal to 1 day.
     */
    public static fromSecondsToDays(seconds: number): number {
        return seconds / 86400;
    }

    /**
     * Converts seconds to milliseconds.
     * @param {number} seconds - The number of seconds to convert.
     * @returns {number} The equivalent number of milliseconds.
     * @remarks 1 second is equal to 1000 milliseconds.
     */
    public static fromSecondsToMilliseconds(seconds: number): number {
        return seconds * 1000;
    }

    /**
     * Converts seconds to Minecraft ticks.
     * @param {number} seconds - The number of seconds to convert.
     * @returns {number} The equivalent number of Minecraft ticks.
     * @remarks 1 second is equal to 20 Minecraft ticks.
     */
    public static fromSecondsToTicks(seconds: number): number {
        return seconds * 20;
    }

    public static async sleep(ticks: number) {
        return MinecraftServer.system.waitTicks(ticks);
    }

    public runTaskLater(
        callback: (...args: any[]) => void,
        delay?: 1 | number,
        ...args: any[]
    ): number {
        try {
            const ev = MinecraftServer.system.runTimeout(() => {
                callback(args);
            }, delay);
            return ev;
        } catch (error: any) {
            this.LOGGER.error(error, error.stack);
        }
    }

    public runTaskTimer(
        callback: (...args: any[]) => void,
        delay?: 1 | number,
        ...args: any[]
    ): number {
        try {
            const ev = MinecraftServer.system.runInterval(() => {
                callback(args);
            }, delay);
            return ev;
        } catch (error: any) {
            this.LOGGER.error(error, error.stack);
        }
    }

    public cancelTask(taskId: number): void {
        try {
            MinecraftServer.system.clearRun(taskId);
        } catch (error: any) {
            this.LOGGER.error(error, error.stack);
        }
    }
}
