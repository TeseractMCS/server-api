export default class TimerUtil {
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

    
}
