export default class FormatUtil {
    static clamp(num, min, max) {
        return num <= min ? min : num >= max ? max : num;
    }
    /**
     * Adds a leading zero if the number has a single digit.
     *
     * @param value - The number to format.
     * @returns The formatted number as a string.
     *
     * @remarks This function checks the length of the number converted to a string. If the length
     * is 1 (i.e., the number is a single digit), it prepends a '0' to the number before converting
     * it back to a string. Otherwise, it returns the number as a string without modification.
     */
    padWithZero(value) {
        return value.toString().length === 1 ? `0${value}` : `${value}`;
    }
    /**
     * Parses a total number of seconds into a formatted time string (HH:MM:SS).
     *
     * @param seconds - The total number of seconds to parse.
     * @returns A formatted time string in the format HH:MM:SS.
     */
    parseTime(seconds) {
        const diff = (value) => {
            return value.toString().length == 1 ? `0${value}` : `${value}`;
        };
        let days = Math.floor(seconds / 24 / 60 / 60);
        let hoursLeft = Math.floor(seconds - days * 86400);
        let hours = Math.floor(hoursLeft / 3600);
        let minutesLeft = Math.floor(hoursLeft - hours * 3600);
        let minutes = Math.floor(minutesLeft / 60);
        let remainingSeconds = seconds % 60;
        return `${diff(hours)}:${diff(minutes)}:${diff(remainingSeconds)}`;
    }
    /**
     * Replaces placeholders with the provided values.
     * @param string - The string containing placeholders.
     * @param placeHolders - The values to replace the placeholders.
     * @returns The string with placeholders replaced.
     * @remarks This method assumes that placeholders in the form of '%...%' are used in the input string.
     */
    static placeHolder(string, ...placeHolders) {
        let index = 0;
        return string.replace(/%.*?%/g, () => {
            return placeHolders[index++].toString();
        });
    }
    /**
     * Truncates a text to a specific length and adds "..." if necessary.
     * @param text - The text to truncate.
     * @param length - The maximum length of the text.
     * @returns The truncated text.
     * @remarks If the length of the text is less than or equal to the specified length, the original text is returned unchanged.
     */
    static truncate(text, length) {
        if (text.length <= length)
            return text;
        return text.substring(0, length) + "...";
    }
    /**
     * Capitalizes the first letter of each word in a string.
     * @param text - The text to capitalize.
     * @returns The capitalized text.
     * @remarks This function assumes words are separated by spaces or other whitespace characters.
     */
    static capitalize(text) {
        return text.replace(/\b\w/g, (char) => char.toUpperCase());
    }
    /**
     * Converts a string to camelCase.
     * @param text - The text to convert.
     * @returns The text in camelCase.
     * @remarks This method converts hyphens, underscores, or spaces followed by a character to uppercase.
     */
    static camelCase(text) {
        return text
            .replace(/[-_\s]+(.)?/g, (_, char) => char ? char.toUpperCase() : "")
            .replace(/^\w/, (char) => char.toLowerCase());
    }
    /**
     * Converts a string to kebab-case.
     * @param text - The text to convert.
     * @returns The text in kebab-case.
     * @remarks This method replaces spaces or underscores with hyphens and converts uppercase letters to lowercase.
     */
    static kebabCase(text) {
        return text
            .replace(/\s+/g, "-")
            .replace(/([a-z])([A-Z])/g, "$1-$2")
            .toLowerCase();
    }
    /**
     * Converts a string to snake_case.
     * @param text - The text to convert.
     * @returns The text in snake_case.
     * @remarks This method replaces spaces with underscores and converts uppercase letters to lowercase with an underscore.
     */
    static snakeCase(text) {
        return text
            .replace(/\s+/g, "_")
            .replace(/([a-z])([A-Z])/g, "$1_$2")
            .toLowerCase();
    }
    /**
     * Formats a date into a readable string.
     * @param date - The date to format.
     * @param locale - The locale for formatting (default is 'en-US').
     * @param options - Options for formatting the date (see Intl.DateTimeFormatOptions).
     * @returns The formatted date string.
     * @remarks This method uses the Intl.DateTimeFormat API for date formatting.
     */
    static formatDate(date, locale = "en-US", options = {}) {
        return new Intl.DateTimeFormat(locale, options).format(new Date(date));
    }
    /**
     * Pads a number with zeros on the left until it reaches a specific length.
     * @param number - The number to pad.
     * @param length - The desired length of the padded number.
     * @returns The padded number as a string.
     * @remarks This method converts the number to a string and uses String.prototype.padStart for padding.
     */
    static padStart(number, length) {
        return String(number).padStart(length, "0");
    }
    /**
     * Converts a string to title case (every word capitalized except common prepositions).
     * @param text - The text to convert.
     * @returns The text in title case.
     * @remarks This function capitalizes the first letter of each word in the text, except for common prepositions.
     */
    static titleCase(text) {
        const exceptions = [
            "a",
            "an",
            "and",
            "the",
            "but",
            "or",
            "on",
            "in",
            "with",
        ];
        return text.replace(/\w\S*/g, (word, index) => {
            if (index !== 0 && exceptions.includes(word.toLowerCase())) {
                return word.toLowerCase();
            }
            return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
        });
    }
    // /**
    //  * Formats a number with thousands separators.
    //  * @param number - The number to format.
    //  * @param locale - The locale for formatting (default is 'en-US').
    //  * @returns The formatted number as a string.
    //  * @remarks This method uses the Intl.NumberFormat API to format the number with thousands separators.
    //  */
    // public static formatNumber(
    //     number: number,
    //     locale: string = "en-US",
    // ): string {
    //     return new Intl.NumberFormat(locale).format(number);
    // }
    /**
     * Rounds a number to a specific number of decimal places.
     * @param number - The number to round.
     * @param decimals - The number of decimal places (default is 2).
     * @returns The rounded number as a string.
     * @remarks This method uses {@link Number.toFixed} to round the number to the specified decimal places.
     */
    static round(number, decimals = 2) {
        return Number(Math.round(Number(number + "e" + decimals)) + "e-" + decimals).toFixed(decimals);
    }
    /**
     * Checks if a string is a palindrome.
     * @param text - The text to check.
     * @returns True if the text is a palindrome, false otherwise.
     * @remarks This method removes non-alphanumeric characters, converts the text to lowercase, and checks if it reads the same forwards and backwards.
     */
    static isPalindrome(text) {
        const cleaned = text.replace(/[^A-Za-z0-9]/g, "").toLowerCase();
        return cleaned === cleaned.split("").reverse().join("");
    }
    /**
     * Reverses a string.
     * @param text - The text to reverse.
     * @returns The reversed text.
     * @remarks This method splits the text into an array of characters, reverses the array, and joins it back into a string.
     */
    static reverseString(text) {
        return text.split("").reverse().join("");
    }
    /**
     * Removes accents from characters in a string.
     * @param text - The text to remove accents from.
     * @returns The text with accents removed.
     * @remarks This method uses Unicode normalization to decompose accented characters and removes combining diacritical marks.
     */
    static removeAccents(text) {
        return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }
    /**
     * Converts a string to a slug for URL-friendly formatting.
     * @param text - The text to convert.
     * @returns The text formatted as a slug.
     * @remarks This method converts spaces and non-word characters to hyphens and removes leading/trailing hyphens.
     */
    static toSlug(text) {
        return text
            .toLowerCase()
            .trim()
            .replace(/[\s\W-]+/g, "-")
            .replace(/^-+|-+$/g, "");
    }
    /**
     * Generates a random string of a specific length.
     * @param length - The length of the random string.
     * @returns The generated random string.
     * @remarks This method generates a random string using alphanumeric characters.
     */
    static randomString(length) {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let result = "";
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }
}
//# sourceMappingURL=FormatUtil.js.map