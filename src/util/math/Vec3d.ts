// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { Vector3 as MinecraftVector3 } from "@minecraft/server";
import Clamp from "./Clamp";

/**
 * MinecraftVector3 wrapper class which can be used as a MinecraftVector3 for APIs on \@minecraft/server which require a Vector,
 * but also contain additional helper methods. This is an alternative to using the core Vector 3 utility
 * methods directly, for those who prefer a more object-oriented approach. This version of the class is mutable
 * and changes state inline.
 *
 */
export default class Vec3d implements MinecraftVector3 {
    public static UP = new this({ x: 0, y: 1, z: 0 });
    public static DOWN = new this({ x: 0, y: -1, z: 0 });
    public static LEFT = new this({ x: -1, y: 0, z: 0 });
    public static RIGHT = new this({ x: 1, y: 0, z: 0 });
    public static FORWARD = new this({ x: 0, y: 0, z: 1 });
    public static BACK = new this({ x: 0, y: 0, z: -1 });
    public static ONE = new this({ x: 1, y: 1, z: 1 });
    public static ZERO = new this({ x: 0, y: 0, z: 0 });
    public static WEST = new this({ x: -1, y: 0, z: 0 });
    public static EAST = new this({ x: 1, y: 0, z: 0 });
    public static NORTH = new this({ x: 0, y: 0, z: 1 });
    public static SOUTH = new this({ x: 0, y: 0, z: -1 });

    public clone(): Vec3d {
        return new Vec3d(this);
    }

    /**
     * equals
     *
     * Check the equality of two vectors
     */
    public static equals(v1: MinecraftVector3, v2: MinecraftVector3): boolean {
        return v1.x === v2.x && v1.y === v2.y && v1.z === v2.z;
    }

    /**
     * add
     *
     * Add two vectors to produce a new vector
     */
    public static add(
        v1: MinecraftVector3,
        v2: MinecraftVector3,
    ): MinecraftVector3 {
        return { x: v1.x + v2.x, y: v1.y + v2.y, z: v1.z + v2.z };
    }

    /**
     * subtract
     *
     * Subtract two vectors to produce a new vector (v1-v2)
     */
    public static subtract(
        v1: MinecraftVector3,
        v2: MinecraftVector3,
    ): MinecraftVector3 {
        return { x: v1.x - v2.x, y: v1.y - v2.y, z: v1.z - v2.z };
    }

    /** scale
     *
     * Multiple all entries in a vector by a single scalar value producing a new vector
     */
    public static scale(v1: MinecraftVector3, scale: number): MinecraftVector3 {
        return { x: v1.x * scale, y: v1.y * scale, z: v1.z * scale };
    }

    /**
     * dot
     *
     * Calculate the dot product of two vectors
     */
    public static dot(a: MinecraftVector3, b: MinecraftVector3): number {
        return a.x * b.x + a.y * b.y + a.z * b.z;
    }

    /**
     * cross
     *
     * Calculate the cross product of two vectors. Returns a new vector.
     */
    public static cross(
        a: MinecraftVector3,
        b: MinecraftVector3,
    ): MinecraftVector3 {
        return {
            x: a.y * b.z - a.z * b.y,
            y: a.z * b.x - a.x * b.z,
            z: a.x * b.y - a.y * b.x,
        };
    }

    /**
     * magnitude
     *
     * The magnitude of a vector
     */
    public static magnitude(v: MinecraftVector3): number {
        return Math.sqrt(v.x ** 2 + v.y ** 2 + v.z ** 2);
    }

    /**
     * distance
     *
     * Calculate the distance between two vectors
     */
    public static distance(a: MinecraftVector3, b: MinecraftVector3): number {
        return Vec3d.magnitude(Vec3d.subtract(a, b));
    }

    /**
     * normalize
     *
     * Takes a vector 3 and normalizes it to a unit vector
     */
    public static normalize(v: MinecraftVector3): MinecraftVector3 {
        const mag = Vec3d.magnitude(v);
        return { x: v.x / mag, y: v.y / mag, z: v.z / mag };
    }

    /**
     * floor
     *
     * Floor the components of a vector to produce a new vector
     */
    public static floor(v: MinecraftVector3): MinecraftVector3 {
        return { x: Math.floor(v.x), y: Math.floor(v.y), z: Math.floor(v.z) };
    }

    /**
     * toString
     *
     * Create a string representation of a MinecraftVector3
     */
    public static toString(
        v: MinecraftVector3,
        options?: { decimals?: number; delimiter?: string },
    ): string {
        const decimals = options?.decimals ?? 2;
        const str: string[] = [
            v.x.toFixed(decimals),
            v.y.toFixed(decimals),
            v.z.toFixed(decimals),
        ];
        return str.join(options?.delimiter ?? ", ");
    }

    /**
     * clamp
     *
     * Clamps the components of a vector to limits to produce a new vector
     */
    public static clamp(
        v: MinecraftVector3,
        limits?: {
            min?: Partial<MinecraftVector3>;
            max?: Partial<MinecraftVector3>;
        },
    ): MinecraftVector3 {
        return {
            x: Clamp(
                v.x,
                limits?.min?.x ?? Number.MIN_SAFE_INTEGER,
                limits?.max?.x ?? Number.MAX_SAFE_INTEGER,
            ),
            y: Clamp(
                v.y,
                limits?.min?.y ?? Number.MIN_SAFE_INTEGER,
                limits?.max?.y ?? Number.MAX_SAFE_INTEGER,
            ),
            z: Clamp(
                v.z,
                limits?.min?.z ?? Number.MIN_SAFE_INTEGER,
                limits?.max?.z ?? Number.MAX_SAFE_INTEGER,
            ),
        };
    }

    /**
     * lerp
     *
     * Constructs a new vector using linear interpolation on each component from two vectors.
     */
    public static lerp(
        a: MinecraftVector3,
        b: MinecraftVector3,
        t: number,
    ): MinecraftVector3 {
        return {
            x: a.x + (b.x - a.x) * t,
            y: a.y + (b.y - a.y) * t,
            z: a.z + (b.z - a.z) * t,
        };
    }

    /**
     * slerp
     *
     * Constructs a new vector using spherical linear interpolation on each component from two vectors.
     */
    public static slerp(
        a: MinecraftVector3,
        b: MinecraftVector3,
        t: number,
    ): MinecraftVector3 {
        const theta = Math.acos(Vec3d.dot(a, b));
        const sinTheta = Math.sin(theta);
        const ta = Math.sin((1.0 - t) * theta) / sinTheta;
        const tb = Math.sin(t * theta) / sinTheta;
        return Vec3d.add(Vec3d.scale(a, ta), Vec3d.scale(b, tb));
    }

    constructor(vec: MinecraftVector3, arg?: never, arg2?: never);
    constructor(x: number, y: number, z: number);
    constructor(first: number | MinecraftVector3, y?: number, z?: number) {
        if (typeof first === "object") {
            this.x = first.x;
            this.y = first.y;
            this.z = first.z;
        } else {
            this.x = first;
            this.y = y ?? 0;
            this.z = z ?? 0;
        }
    }

    public x: number;
    public y: number;
    public z: number;

    /**
     * Assigns the values of the passed in vector to this vector. Returns itself.
     */
    public assign(vec: MinecraftVector3): Vec3d {
        const newVec = new Vec3d(vec);
        newVec.x = vec.x;
        newVec.y = vec.y;
        newVec.z = vec.z;
        return newVec;
    }

    /**
     * Check the equality of two vectors
     */
    public equals(v: MinecraftVector3): boolean {
        return Vec3d.equals(this, v);
    }

    /**
     * Adds the vector v to this, returning itself.
     */
    public add(v: MinecraftVector3): Vec3d {
        return this.assign(Vec3d.add(this, v));
    }

    /**
     * Subtracts the vector v from this, returning itself.
     */
    public subtract(v: MinecraftVector3): Vec3d {
        return this.assign(Vec3d.subtract(this, v));
    }

    /**
     * Scales this by the passed in value, returning itself.
     */
    public scale(val: number): Vec3d {
        return this.assign(Vec3d.scale(this, val));
    }

    /**
     * Computes the dot product of this and the passed in vector.
     */
    public dot(vec: MinecraftVector3): number {
        return Vec3d.dot(this, vec);
    }

    /**
     * Computes the cross product of this and the passed in vector, returning itself.
     */
    public cross(vec: MinecraftVector3): Vec3d {
        return this.assign(Vec3d.cross(this, vec));
    }

    /**
     * The magnitude of the vector
     */
    public magnitude(): number {
        return Vec3d.magnitude(this);
    }

    /**
     * Calculate the distance between two vectors
     */
    public distance(vec: MinecraftVector3): number {
        return Vec3d.distance(this, vec);
    }

    /**
     * Normalizes this vector, returning itself.
     */
    public normalize(): Vec3d {
        return this.assign(Vec3d.normalize(this));
    }

    /**
     * Floor the components of a vector to produce a new vector
     */
    public floor(): Vec3d {
        return this.assign(Vec3d.floor(this));
    }

    /**
     * Create a string representation of a vector
     */
    public toString(options?: {
        decimals?: number;
        delimiter?: string;
    }): string {
        return Vec3d.toString(this, options);
    }

    /**
     * Clamps the components of a vector to limits to produce a new vector
     */
    public clamp(limits: {
        min?: Partial<MinecraftVector3>;
        max?: Partial<MinecraftVector3>;
    }): Vec3d {
        return this.assign(Vec3d.clamp(this, limits));
    }

    /**
     * Constructs a new vector using linear interpolation on each component from two vectors.
     */
    public lerp(vec: MinecraftVector3, t: number): Vec3d {
        return this.assign(Vec3d.lerp(this, vec, t));
    }

    /**
     * Constructs a new vector using spherical linear interpolation on each component from two vectors.
     */
    public slerp(vec: MinecraftVector3, t: number): Vec3d {
        return this.assign(Vec3d.slerp(this, vec, t));
    }
}
