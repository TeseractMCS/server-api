export default class TimerUtil {
    private LOGGER;
    static runLater(callback: Function, tickDelay: number): void;
    static MaxTickRange: number;
    static parseDate(seconds: number): string;
    static dateToSeconds(timeString: string): number;
    /**
     * Converts seconds to a formatted time public string (HH:MM:SS).
     * @param {number} seconds - The total number of seconds to convert.
     * @returns {string} The formatted time string.
     * @remarks Pads single digit hours, minutes, and seconds with a leading zero.
     */
    static parseTime(seconds: number): string;
    /**
     * Converts hours to seconds.
     * @param {number} hours - The number of hours to convert.
     * @returns {number} The equivalent number of seconds.
     * @remarks 1 hour is equal to 3600 seconds.
     */
    static fromHoursToSeconds(hours: number): number;
    /**
     * Converts minutes to seconds.
     * @param {number} minutes - The number of minutes to convert.
     * @returns {number} The equivalent number of seconds.
     * @remarks 1 minute is equal to 60 seconds.
     */
    static fromMinutesToSeconds(minutes: number): number;
    /**
     * Converts days to seconds.
     * @param {number} days - The number of days to convert.
     * @returns {number} The equivalent number of seconds.
     * @remarks 1 day is equal to 86400 seconds.
     */
    static fromDaysToSeconds(days: number): number;
    /**
     * Converts milliseconds to seconds.
     * @param {number} milliseconds - The number of milliseconds to convert.
     * @returns {number} The equivalent number of seconds.
     * @remarks 1000 milliseconds are equal to 1 second.
     */
    static fromMillisecondsToSeconds(milliseconds: number): number;
    /**
     * Converts Minecraft ticks to seconds.
     * @param {number} ticks - The number of Minecraft ticks to convert.
     * @returns {number} The equivalent number of seconds.
     * @remarks 20 Minecraft ticks are equal to 1 second.
     */
    static fromTicksToSeconds(ticks: number): number;
    /**
     * Converts seconds to hours.
     * @param {number} seconds - The number of seconds to convert.
     * @returns {number} The equivalent number of hours.
     * @remarks 3600 seconds are equal to 1 hour.
     */
    static fromSecondsToHours(seconds: number): number;
    /**
     * Converts seconds to minutes.
     * @param {number} seconds - The number of seconds to convert.
     * @returns {number} The equivalent number of minutes.
     * @remarks 60 seconds are equal to 1 minute.
     */
    static fromSecondsToMinutes(seconds: number): number;
    /**
     * Converts seconds to days.
     * @param {number} seconds - The number of seconds to convert.
     * @returns {number} The equivalent number of days.
     * @remarks 86400 seconds are equal to 1 day.
     */
    static fromSecondsToDays(seconds: number): number;
    /**
     * Converts seconds to milliseconds.
     * @param {number} seconds - The number of seconds to convert.
     * @returns {number} The equivalent number of milliseconds.
     * @remarks 1 second is equal to 1000 milliseconds.
     */
    static fromSecondsToMilliseconds(seconds: number): number;
    /**
     * Converts seconds to Minecraft ticks.
     * @param {number} seconds - The number of seconds to convert.
     * @returns {number} The equivalent number of Minecraft ticks.
     * @remarks 1 second is equal to 20 Minecraft ticks.
     */
    static fromSecondsToTicks(seconds: number): number;
    static sleep(ticks: number): Promise<void>;
    runTaskLater(callback: (...args: any[]) => void, delay?: 1 | number, ...args: any[]): number;
    runTaskTimer(callback: (...args: any[]) => void, delay?: 1 | number, ...args: any[]): number;
    cancelTask(taskId: number): void;
}
