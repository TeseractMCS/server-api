/**
 * Represents an identifier consisting of a namespace and a path.
 * Inherits from the `String` class.
 */
export default class Identifier extends String {
    private readonly namespace: string;
    private readonly path: string;

    /**
     * Creates an instance of the `Identifier` class.
     * @param {string} namespace - The namespace of the identifier.
     * @param {string} path - The path of the identifier.
     * @throws {Error} Throws an error if the namespace or path is invalid.
     */
    private constructor(namespace: string, path: string) {
        super(`${namespace}:${path}`);

        this.namespace = namespace;
        this.path = path;

        Object.setPrototypeOf(this, Identifier.prototype);
    }

    /**
     * Creates an `Identifier` instance from the given namespace and path.
     * @param {string} namespace - The namespace of the identifier.
     * @param {string} path - The path of the identifier.
     * @returns {Identifier} The created `Identifier` instance.
     * @throws {Error} Throws an error if the namespace or path is invalid.
     */
    public static of(namespace: string, path: string): Identifier {
        if (!this.isValidNamespace(namespace) || !this.isValidPath(path)) {
            throw new Error(`Invalid Identifier: ${namespace}:${path}`);
        }
        return new Identifier(namespace, path) as Identifier;
    }

    /**
     * Creates an `Identifier` instance from a string representation.
     * @param {string} identifier - The string representation of the identifier (format: "namespace:path").
     * @returns {Identifier} The created `Identifier` instance.
     * @throws {Error} Throws an error if the identifier string format is invalid.
     */
    public static fromString(identifier: string): Identifier {
        const [namespace, path] = identifier.split(":");
        if (!namespace || !path) {
            throw new Error(`Invalid identifier format: ${identifier}`);
        }
        return this.of(namespace, path);
    }

    /**
     * Checks if this identifier is equal to another identifier or string.
     * @param {Identifier | string} other - The identifier or string to compare with.
     * @returns {boolean} `true` if the identifiers are equal, `false` otherwise.
     */
    public equals(other: Identifier | string): boolean {
        if (other instanceof Identifier) {
            return (
                this.namespace === other.namespace && this.path === other.path
            );
        }
        return this.toString() === other;
    }

    /**
     * Validates the namespace format.
     * @param {string} namespace - The namespace to validate.
     * @returns {boolean} `true` if the namespace is valid, `false` otherwise.
     */
    private static isValidNamespace(namespace: string): boolean {
        return /^[a-z0-9._-]+$/.test(namespace);
    }

    /**
     * Validates the path format.
     * @param {string} path - The path to validate.
     * @returns {boolean} `true` if the path is valid, `false` otherwise.
     */
    private static isValidPath(path: string): boolean {
        return /^[a-z0-9/._-]+$/.test(path);
    }

    /**
     * Gets the namespace part of the identifier.
     * @returns {string} The namespace of the identifier.
     */
    public getNamespace(): string {
        return this.split(":")[0];
    }

    /**
     * Gets the path part of the identifier.
     * @returns {string} The path of the identifier.
     */
    public getPath(): string {
        return this.split(":")[1];
    }
}
