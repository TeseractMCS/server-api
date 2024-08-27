import "reflect-metadata";
import ArgumentParser from "./ArgumentParser";
import Command from "./Command";
import CommandManager from "./CommandManager";
import { Player } from "@minecraft/server";


export default function CommandHandler(
    player: Player,
    commandName: string,
    ...args: string[]
) {
    const commandClass = CommandManager.getCommands()?.find((cmd) => {
        const cmdData = cmd?.constructor["__commandData"] ?? cmd.__commandData;
        if (!cmdData) {
            return false;
        }
        return (
            cmdData?.name == commandName.toLowerCase() ||
            cmdData?.aliases.includes(commandName.toLowerCase())
        );
    });

    if (!commandClass) {
        return player.sendMessage([
            {
                text: "§c",
            },
            { translate: "commands.generic.unknown", with: [commandName] },
        ]);
    }

    const command: Command =
        commandClass.constructor["__commandData"] ?? commandClass.__commandData;
    let argsCopy = [...args];
    let data = command;
    let previous = commandName.toLowerCase();
    let current = args.shift()?.toLowerCase();
    let potentialSubCommand;
    let subCommandPadding = 0;
    let errorMessage;

    while (current) {
        const subCommand = data.subCommands
            ? Object.values(data.subCommands).find(
                  (cmd) =>
                      cmd.aliases.includes(current as string) ||
                      cmd.name == current,
              )
            : undefined;

        if (subCommand) {
            if (
                subCommand.permission &&
                !subCommand.permission(player)
            ) {
                errorMessage = {
                    translate: "commands.generic.unknown",
                    with: [commandName],
                };

                continue;
            }

            potentialSubCommand = subCommand;
            data = subCommand;
            previous = current;
            current = args.shift();
            subCommandPadding++;
        } else {
            break;
        }
    }
    {
        if (!current) {
            errorMessage = {
                translate: "commands.generic.syntax",
                with: [previous + " ", current ?? ""],
            };
        }
    }

    let bestMatch: { method: string; args: any[] } | null = null;
    let bestMatchCount = 0;

    if (potentialSubCommand && potentialSubCommand.callbacks) {
        for (const callback of potentialSubCommand.callbacks) {
            const argsCopySub = argsCopy?.slice(subCommandPadding) ?? [];
            const paramTypes =
                Reflect.getMetadata(
                    "design:paramtypes",
                    commandClass,
                    callback,
                )?.slice(1) ?? [];
            const optionalParams =
                commandClass.__optionalParameters?.[callback] || [];

            if (
                argsCopySub.length === paramTypes.length ||
                argsCopySub.length === paramTypes.length - optionalParams.length
            ) {
                for (let i = argsCopySub.length; i < paramTypes.length; i++) {
                    if (!optionalParams.includes(i)) {
                        //@ts-ignore
                        argsCopySub.push(undefined);
                    }
                }

                try {
                    const parsedArgs =
                        argsCopySub
                            ?.slice(0, paramTypes.length)
                            .map((arg, index) =>
                                ArgumentParser(arg, paramTypes[index]),
                            ) ?? [];

                    if (parsedArgs.length >= bestMatchCount) {
                        bestMatch = {
                            method: callback,
                            args: parsedArgs,
                        };
                        bestMatchCount = parsedArgs.length;
                    }
                } catch (error: any) {
                    errorMessage = error;
                }
            } else {
                errorMessage = {
                    translate: "commands.generic.syntax",
                    with: [previous, current ?? ""],
                };
            }
        }

        if (bestMatch) {
            return commandClass[bestMatch.method](player, ...bestMatch.args);
        } else {
            errorMessage = {
                translate: "commands.generic.syntax",
                with: [current, ""],
            };
        }
    }

    // if (potentialSubCommand && potentialSubCommand.callbacks) {
    //     for (const callback of potentialSubCommand.callbacks) {
    //         const argumentTypes = (Reflect.getMetadata(
    //             "design:paramtypes",
    //             commandClass,
    //             callback,
    //         ) || [])?.slice(1);
    //         const optionalParameters = commandClass.__optionalParameters?.[callback] || [];

    //         // Check for invalid optional parameter usage
    //         for (let i = 0; i < argumentTypes.length - 1; i++) {
    //             if (optionalParameters.includes(i) && !optionalParameters.includes(i + 1)) {
    //                 throw new TypeError(`Optional parameter at index ${i} is followed by a required parameter at index ${i + 1}`);
    //             }
    //         }

    //         try {
    //             const parsedArgs = argsCopy?.slice(subCommandPadding).map((arg, index) =>
    //                 parseArgument(
    //                     arg,
    //                     argumentTypes[index],
    //                 ),
    //             );

    //             // Fill optional parameters with undefined
    //             while (parsedArgs.length < argumentTypes.length) {
    //                 parsedArgs.push(undefined);
    //             }

    //             return commandClass[callback](player, ...parsedArgs);
    //         } catch (error: any) {
    //             return player.sendMessage(`Error: ${error.message} at ${data.aliases} : ${error.stack}`);
    //         }
    //     }

    //     return player.sendMessage(`Invalid arguments for subcommand "${previous}"`);
    // }

    // If no subcommand matches, search for the optimal @default method
    const defaults =
        (commandClass.constructor.__commandData ?? commandClass.__commandData)
            .defaults || [];

    if (defaults.length > 0) {
        let bestMatch: { method: string; args: any[] } | null = null;
        let bestMatchCount = 0;

        for (const defaultMethod of defaults) {
            const paramTypes =
                Reflect.getMetadata(
                    "design:paramtypes",
                    commandClass,
                    defaultMethod,
                )?.slice(1) ?? [];
            const optionalParams =
                commandClass.__optionalParameters?.[defaultMethod] || [];

            if (
                argsCopy.length === paramTypes.length ||
                argsCopy.length === paramTypes.length - optionalParams.length
            ) {
                for (let i = argsCopy.length; i < paramTypes.length; i++) {
                    if (!optionalParams.includes(i)) {
                        //@ts-ignore
                        argsCopy.push(undefined);
                    }
                }

                try {
                    const parsedArgs =
                        argsCopy
                            ?.slice(0, paramTypes.length)
                            .map((arg, index) =>
                                ArgumentParser(arg, paramTypes[index]),
                            ) ?? [];

                    if (parsedArgs.length >= bestMatchCount) {
                        bestMatch = { method: defaultMethod, args: parsedArgs };
                        bestMatchCount = parsedArgs.length;
                    }
                } catch (error: any) {
                    errorMessage = error;
                }
            }
        }

        if (bestMatch) {
            return commandClass[bestMatch.method](player, ...bestMatch.args);
        } else {
            errorMessage = !errorMessage
                ? {
                      translate: "commands.generic.syntax",
                      with: [current + " ", ""],
                  }
                : errorMessage;
        }
    }
    
    player.sendMessage([{ text: "§c" }, errorMessage]);
}
