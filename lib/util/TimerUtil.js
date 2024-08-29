import * as MinecraftServer from "@minecraft/server";
import Logger from "../Logger";
class TimerUtil {
    constructor() {
        this.LOGGER = new Logger();
    }
    static runLater(callback, tickDelay) {
        (async () => {
            await this.sleep(tickDelay);
            callback();
        })();
    }
    static parseDate(seconds) {
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
                if (count === 2)
                    break;
            }
        }
        return result.trim();
    }
    static dateToSeconds(timeString) {
        const matches = timeString.match(/(\d+)([dhms])/g) || [];
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
    static parseTime(seconds) {
        const padWithZero = (value) => value.toString().padStart(2, "0");
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return `${padWithZero(hours)}:${padWithZero(minutes)}:${padWithZero(remainingSeconds)}`;
    }
    /**
     * Converts hours to seconds.
     * @param {number} hours - The number of hours to convert.
     * @returns {number} The equivalent number of seconds.
     * @remarks 1 hour is equal to 3600 seconds.
     */
    static fromHoursToSeconds(hours) {
        return hours * 3600;
    }
    /**
     * Converts minutes to seconds.
     * @param {number} minutes - The number of minutes to convert.
     * @returns {number} The equivalent number of seconds.
     * @remarks 1 minute is equal to 60 seconds.
     */
    static fromMinutesToSeconds(minutes) {
        return minutes * 60;
    }
    /**
     * Converts days to seconds.
     * @param {number} days - The number of days to convert.
     * @returns {number} The equivalent number of seconds.
     * @remarks 1 day is equal to 86400 seconds.
     */
    static fromDaysToSeconds(days) {
        return days * 86400;
    }
    /**
     * Converts milliseconds to seconds.
     * @param {number} milliseconds - The number of milliseconds to convert.
     * @returns {number} The equivalent number of seconds.
     * @remarks 1000 milliseconds are equal to 1 second.
     */
    static fromMillisecondsToSeconds(milliseconds) {
        return milliseconds / 1000;
    }
    /**
     * Converts Minecraft ticks to seconds.
     * @param {number} ticks - The number of Minecraft ticks to convert.
     * @returns {number} The equivalent number of seconds.
     * @remarks 20 Minecraft ticks are equal to 1 second.
     */
    static fromTicksToSeconds(ticks) {
        return ticks / 20;
    }
    /**
     * Converts seconds to hours.
     * @param {number} seconds - The number of seconds to convert.
     * @returns {number} The equivalent number of hours.
     * @remarks 3600 seconds are equal to 1 hour.
     */
    static fromSecondsToHours(seconds) {
        return seconds / 3600;
    }
    /**
     * Converts seconds to minutes.
     * @param {number} seconds - The number of seconds to convert.
     * @returns {number} The equivalent number of minutes.
     * @remarks 60 seconds are equal to 1 minute.
     */
    static fromSecondsToMinutes(seconds) {
        return seconds / 60;
    }
    /**
     * Converts seconds to days.
     * @param {number} seconds - The number of seconds to convert.
     * @returns {number} The equivalent number of days.
     * @remarks 86400 seconds are equal to 1 day.
     */
    static fromSecondsToDays(seconds) {
        return seconds / 86400;
    }
    /**
     * Converts seconds to milliseconds.
     * @param {number} seconds - The number of seconds to convert.
     * @returns {number} The equivalent number of milliseconds.
     * @remarks 1 second is equal to 1000 milliseconds.
     */
    static fromSecondsToMilliseconds(seconds) {
        return seconds * 1000;
    }
    /**
     * Converts seconds to Minecraft ticks.
     * @param {number} seconds - The number of seconds to convert.
     * @returns {number} The equivalent number of Minecraft ticks.
     * @remarks 1 second is equal to 20 Minecraft ticks.
     */
    static fromSecondsToTicks(seconds) {
        return seconds * 20;
    }
    static async sleep(ticks) {
        return MinecraftServer.system.waitTicks(ticks);
    }
    runTaskLater(callback, delay, ...args) {
        try {
            const ev = MinecraftServer.system.runTimeout(() => {
                callback(args);
            }, delay);
            return ev;
        }
        catch (error) {
            this.LOGGER.error(error, error.stack);
        }
    }
    runTaskTimer(callback, delay, ...args) {
        try {
            const ev = MinecraftServer.system.runInterval(() => {
                callback(args);
            }, delay);
            return ev;
        }
        catch (error) {
            this.LOGGER.error(error, error.stack);
        }
    }
    cancelTask(taskId) {
        try {
            MinecraftServer.system.clearRun(taskId);
        }
        catch (error) {
            this.LOGGER.error(error, error.stack);
        }
    }
}
TimerUtil.MaxTickRange = 20000000;
export default TimerUtil;
//# sourceMappingURL=TimerUtil.js.map