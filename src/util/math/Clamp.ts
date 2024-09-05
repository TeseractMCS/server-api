/**
 * Clamps the passed in number to the passed in min and max values.
 *
 */
export default function Clamp(val: number, min: number, max: number): number {
    return Math.min(Math.max(val, min), max);
}
