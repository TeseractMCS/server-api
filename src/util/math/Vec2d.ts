import { Vector2 } from "@minecraft/server";

/**
 * Vector2 wrapper class which can be used as a Vector2 for APIs on \@minecraft/server which require a Vector2.
 * @public
 */
export default class Vec2d implements Vector2 {
    public x: number;
    public y: number;

    public constructor(vec: Vector2, arg?: never);
    public constructor(x: number, y: number);
    public constructor(first: number | Vector2, y?: number) {
        if (typeof first === "object") {
            this.x = first.x;
            this.y = first.y;
        } else {
            this.x = first;
            this.y = y ?? 0;
        }
    }

    /**
     * toString
     *
     * Create a string representation of a vector2
     */
    public static toString(
        v: Vector2,
        options?: { decimals?: number; delimiter?: string },
    ): string {
        const decimals = options?.decimals ?? 2;
        const str: string[] = [v.x.toFixed(decimals), v.y.toFixed(decimals)];
        return str.join(options?.delimiter ?? ", ");
    }

    public toString(options?: {
        decimals?: number;
        delimiter?: string;
    }): string {
        return Vec2d.toString(this, options);
    }
}
