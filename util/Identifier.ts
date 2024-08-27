export default class Identifier extends String {
    private readonly namespace: string;
    private readonly path: string;

    private constructor(namespace: string, path: string) {
        super(`${namespace}:${path}`);

        this.namespace = namespace;
        this.path = path;
        
        Object.setPrototypeOf(this, Identifier.prototype);
    }

    public static of(namespace: string, path: string): Identifier {
        if (!this.isValidNamespace(namespace) || !this.isValidPath(path)) {
            throw new Error(`Invalid Identifier: ${namespace}:${path}`);
        }
        return new Identifier(namespace, path) as Identifier;
    }

    public static fromString(identifier: string): Identifier {
        const [namespace, path] = identifier.split(":");
        if (!namespace || !path) {
            throw new Error(`Invalid identifier format: ${identifier}`);
        }
        return this.of(namespace, path);
    }

    public equals(other: Identifier): boolean {
        return this.namespace === other.namespace && this.path === other.path;
    }
    private static isValidNamespace(namespace: string): boolean {
        return /^[a-z0-9._-]+$/.test(namespace);
    }

    private static isValidPath(path: string): boolean {
        return /^[a-z0-9/._-]+$/.test(path);
    }

    getNamespace(): string {
        return this.split(":")[0];
    }

    getPath(): string {
        return this.split(":")[1];
    }
}
