export default class FormatUtil {
    static clamp(num: number, min: number, max: number): number;
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
    padWithZero(value: number): string;
    /**
     * Parses a total number of seconds into a formatted time string (HH:MM:SS).
     *
     * @param seconds - The total number of seconds to parse.
     * @returns A formatted time string in the format HH:MM:SS.
     */
    parseTime(seconds: number): string;
    /**
     * Replaces placeholders with the provided values.
     * @param string - The string containing placeholders.
     * @param placeHolders - The values to replace the placeholders.
     * @returns The string with placeholders replaced.
     * @remarks This method assumes that placeholders in the form of '%...%' are used in the input string.
     */
    static placeHolder(string: string, ...placeHolders: any[]): string;
    /**
     * Truncates a text to a specific length and adds "..." if necessary.
     * @param text - The text to truncate.
     * @param length - The maximum length of the text.
     * @returns The truncated text.
     * @remarks If the length of the text is less than or equal to the specified length, the original text is returned unchanged.
     */
    static truncate(text: string, length: number): string;
    /**
     * Capitalizes the first letter of each word in a string.
     * @param text - The text to capitalize.
     * @returns The capitalized text.
     * @remarks This function assumes words are separated by spaces or other whitespace characters.
     */
    static capitalize(text: string): string;
    /**
     * Converts a string to camelCase.
     * @param text - The text to convert.
     * @returns The text in camelCase.
     * @remarks This method converts hyphens, underscores, or spaces followed by a character to uppercase.
     */
    static camelCase(text: string): string;
    /**
     * Converts a string to kebab-case.
     * @param text - The text to convert.
     * @returns The text in kebab-case.
     * @remarks This method replaces spaces or underscores with hyphens and converts uppercase letters to lowercase.
     */
    static kebabCase(text: string): string;
    /**
     * Converts a string to snake_case.
     * @param text - The text to convert.
     * @returns The text in snake_case.
     * @remarks This method replaces spaces with underscores and converts uppercase letters to lowercase with an underscore.
     */
    static snakeCase(text: string): string;
    /**
     * Formats a date into a readable string.
     * @param date - The date to format.
     * @param locale - The locale for formatting (default is 'en-US').
     * @param options - Options for formatting the date (see Intl.DateTimeFormatOptions).
     * @returns The formatted date string.
     * @remarks This method uses the Intl.DateTimeFormat API for date formatting.
     */
    static formatDate(date: string | Date, locale?: string, options?: Intl.DateTimeFormatOptions): string;
    /**
     * Pads a number with zeros on the left until it reaches a specific length.
     * @param number - The number to pad.
     * @param length - The desired length of the padded number.
     * @returns The padded number as a string.
     * @remarks This method converts the number to a string and uses String.prototype.padStart for padding.
     */
    static padStart(number: number | string, length: number): string;
    /**
     * Converts a string to title case (every word capitalized except common prepositions).
     * @param text - The text to convert.
     * @returns The text in title case.
     * @remarks This function capitalizes the first letter of each word in the text, except for common prepositions.
     */
    static titleCase(text: string): string;
    /**
     * Rounds a number to a specific number of decimal places.
     * @param number - The number to round.
     * @param decimals - The number of decimal places (default is 2).
     * @returns The rounded number as a string.
     * @remarks This method uses {@link Number.toFixed} to round the number to the specified decimal places.
     */
    static round(number: number, decimals?: number): string;
    /**
     * Checks if a string is a palindrome.
     * @param text - The text to check.
     * @returns True if the text is a palindrome, false otherwise.
     * @remarks This method removes non-alphanumeric characters, converts the text to lowercase, and checks if it reads the same forwards and backwards.
     */
    static isPalindrome(text: string): boolean;
    /**
     * Reverses a string.
     * @param text - The text to reverse.
     * @returns The reversed text.
     * @remarks This method splits the text into an array of characters, reverses the array, and joins it back into a string.
     */
    static reverseString(text: string): string;
    /**
     * Removes accents from characters in a string.
     * @param text - The text to remove accents from.
     * @returns The text with accents removed.
     * @remarks This method uses Unicode normalization to decompose accented characters and removes combining diacritical marks.
     */
    static removeAccents(text: string): string;
    /**
     * Converts a string to a slug for URL-friendly formatting.
     * @param text - The text to convert.
     * @returns The text formatted as a slug.
     * @remarks This method converts spaces and non-word characters to hyphens and removes leading/trailing hyphens.
     */
    static toSlug(text: string): string;
    /**
     * Generates a random string of a specific length.
     * @param length - The length of the random string.
     * @returns The generated random string.
     * @remarks This method generates a random string using alphanumeric characters.
     */
    static randomString(length: number): string;
}
