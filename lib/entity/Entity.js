import { Direction, Entity, LocationOutOfWorldBoundariesError, Player, } from "@minecraft/server";
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
        }
        else if (rotationX < -45) {
            return Direction.Up;
        }
        else if (rotationY >= 45 && rotationY < 135) {
            return Direction.East;
        }
        else if (rotationY >= 135 && rotationY < 225) {
            return Direction.South;
        }
        else if (rotationY >= 225 && rotationY < 315) {
            return Direction.West;
        }
        else {
            return Direction.North;
        }
    }
    catch (error) { }
};
Entity.prototype.getCardinalFacing2d = function getCardinalFacing2d() {
    try {
        let rotationY = this.getRotation().y;
        rotationY = ((rotationY % 360) + 360) % 360;
        if (rotationY >= 45 && rotationY < 135) {
            return Direction.West;
        }
        else if (rotationY >= 135 && rotationY < 225) {
            return Direction.South;
        }
        else if (rotationY >= 225 && rotationY < 315) {
            return Direction.East;
        }
        else {
            return Direction.North;
        }
    }
    catch (error) { }
};
Entity.prototype.getBlockBelow = function getBlockBelow(distance = 1) {
    try {
        const ray = this.dimension.getBlockFromRay(this.location, { x: 0, y: -1, z: 0 }, {
            maxDistance: distance,
        });
        if (!ray)
            return undefined;
        return ray.block;
    }
    catch (error) {
        if (error instanceof LocationOutOfWorldBoundariesError) {
            return undefined;
        }
        if (error instanceof LocationOutOfWorldBoundariesError) {
            return undefined;
        }
    }
};
//# sourceMappingURL=Entity.js.map