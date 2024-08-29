declare module "@minecraft/server" {
    interface Entity {
        getCardinalFacing(): Direction;
        getCardinalFacing2d(): Direction;
        getBlockBelow(distance: number): Block;
        isPlayer(): this is Player;
    }
}
export {};
