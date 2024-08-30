class UnitConversor {
    /**
     * Converts hours to seconds.
     * @param {number} hours - The number of hours to convert.
     * @returns {number} The equivalent number of seconds.
     * @remarks 1 hour is equal to 3600 seconds.
     */
    public static fromHoursToSecs(hours: number): number {
        return hours * 3600;
    }

    /**
     * Converts minutes to seconds.
     * @param {number} minutes - The number of minutes to convert.
     * @returns {number} The equivalent number of seconds.
     * @remarks 1 minute is equal to 60 seconds.
     */
    public static fromMinsToSecs(minutes: number): number {
        return minutes * 60;
    }

    /**
     * Converts days to seconds.
     * @param {number} days - The number of days to convert.
     * @returns {number} The equivalent number of seconds.
     * @remarks 1 day is equal to 86400 seconds.
     */
    public static fromDaysToSecs(days: number): number {
        return days * 86400;
    }

    /**
     * Converts milliseconds to seconds.
     * @param {number} milliseconds - The number of milliseconds to convert.
     * @returns {number} The equivalent number of seconds.
     * @remarks 1000 milliseconds are equal to 1 second.
     */
    public static fromMillisToSecs(milliseconds: number): number {
        return milliseconds / 1000;
    }

    /**
     * Converts Minecraft ticks to seconds.
     * @param {number} ticks - The number of Minecraft ticks to convert.
     * @returns {number} The equivalent number of seconds.
     * @remarks 20 Minecraft ticks are equal to 1 second.
     */
    public static fromTicksToSecs(ticks: number): number {
        return ticks / 20;
    }

    /**
     * Converts seconds to hours.
     * @param {number} seconds - The number of seconds to convert.
     * @returns {number} The equivalent number of hours.
     * @remarks 3600 seconds are equal to 1 hour.
     */
    public static fromSecsToHours(seconds: number): number {
        return seconds / 3600;
    }

    /**
     * Converts seconds to minutes.
     * @param {number} seconds - The number of seconds to convert.
     * @returns {number} The equivalent number of minutes.
     * @remarks 60 seconds are equal to 1 minute.
     */
    public static fromSecsToMins(seconds: number): number {
        return seconds / 60;
    }

    /**
     * Converts seconds to days.
     * @param {number} seconds - The number of seconds to convert.
     * @returns {number} The equivalent number of days.
     * @remarks 86400 seconds are equal to 1 day.
     */
    public static fromSecsToDays(seconds: number): number {
        return seconds / 86400;
    }

    /**
     * Converts seconds to milliseconds.
     * @param {number} seconds - The number of seconds to convert.
     * @returns {number} The equivalent number of milliseconds.
     * @remarks 1 second is equal to 1000 milliseconds.
     */
    public static fromSecsToMillis(seconds: number): number {
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
}

export default UnitConversor;