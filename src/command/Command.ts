import { Player } from "@minecraft/server";

export default interface Command {
    name: string;
    subCommands: Record<string, Command>;
    aliases: string[];
    description?: string;
    permission?: (player: Player) => boolean;
    default?: string;
    callback?: string;
    callbacks?: string[];
    defaults?: string[];
}
