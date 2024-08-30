import {
    Direction,
    Entity,
    LocationOutOfWorldBoundariesError,
    Player,
    world,
} from "@minecraft/server";

declare module "@minecraft/server" {
    interface Entity {
        /**
         * Gets the cardinal direction the entity is facing, considering both X and Y rotations.
         * @returns The cardinal direction (North, East, South, West, Up, or Down).
         */
        getCardinalFacing(): Direction;

        /**
         * Gets the cardinal direction the entity is facing, considering only the Y rotation (2D plane).
         * @returns The cardinal direction (North, East, South, or West).
         */
        getCardinalFacing2d(): Direction;

        /**
         * Gets the block located below the entity at a specified distance.
         * @param distance - The distance below the entity to check. Defaults to 1.
         * @returns The block below the entity, or `undefined` if no block is found or an error occurs.
         */
        getBlockBelow(distance: number): Block;

        /**
         * Determines if the entity is an instance of a Player.
         * @returns `true` if the entity is a Player; otherwise, `false`.
         */
        isPlayer(): this is Player;
    }
}

//@ts-ignore
Entity.prototype.isPlayer = function isPlayer() {
    return this instanceof Player;
};

Entity.prototype.getCardinalFacing = function getCardinalFacing() {
    try {
        this;
        let rotationX = this.getRotation().y;
        rotationX = ((rotationX % 360) + 360) % 360;
        let rotationY = this.getRotation().y;
        rotationY = ((rotationY % 360) + 360) % 360;

        if (rotationX > 45) {
            return Direction.Down;
        } else if (rotationX < -45) {
            return Direction.Up;
        } else if (rotationY >= 45 && rotationY < 135) {
            return Direction.East;
        } else if (rotationY >= 135 && rotationY < 225) {
            return Direction.South;
        } else if (rotationY >= 225 && rotationY < 315) {
            return Direction.West;
        } else {
            return Direction.North;
        }
    } catch (error) {}
};

Entity.prototype.getCardinalFacing2d = function getCardinalFacing2d() {
    try {
        let rotationY = this.getRotation().y;
        rotationY = ((rotationY % 360) + 360) % 360;

        if (rotationY >= 45 && rotationY < 135) {
            return Direction.West;
        } else if (rotationY >= 135 && rotationY < 225) {
            return Direction.South;
        } else if (rotationY >= 225 && rotationY < 315) {
            return Direction.East;
        } else {
            return Direction.North;
        }
    } catch (error) {}
};

Entity.prototype.getBlockBelow = function getBlockBelow(distance = 1) {
    try {
        const ray = this.dimension.getBlockFromRay(
            this.location,
            { x: 0, y: -1, z: 0 },
            {
                maxDistance: distance,
            },
        );

        if (!ray) return undefined;

        return ray.block;
    } catch (error: any) {
        if (error instanceof LocationOutOfWorldBoundariesError) {
            return undefined;
        }
        if (error instanceof LocationOutOfWorldBoundariesError) {
            return undefined;
        }
    }
};
