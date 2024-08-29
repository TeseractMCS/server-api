export default class Identifier extends String {
    private readonly namespace;
    private readonly path;
    private constructor();
    static of(namespace: string, path: string): Identifier;
    static fromString(identifier: string): Identifier;
    equals(other: Identifier): boolean;
    private static isValidNamespace;
    private static isValidPath;
    getNamespace(): string;
    getPath(): string;
}
