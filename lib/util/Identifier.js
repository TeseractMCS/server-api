export default class Identifier extends String {
    constructor(namespace, path) {
        super(`${namespace}:${path}`);
        this.namespace = namespace;
        this.path = path;
        Object.setPrototypeOf(this, Identifier.prototype);
    }
    static of(namespace, path) {
        if (!this.isValidNamespace(namespace) || !this.isValidPath(path)) {
            throw new Error(`Invalid Identifier: ${namespace}:${path}`);
        }
        return new Identifier(namespace, path);
    }
    static fromString(identifier) {
        const [namespace, path] = identifier.split(":");
        if (!namespace || !path) {
            throw new Error(`Invalid identifier format: ${identifier}`);
        }
        return this.of(namespace, path);
    }
    equals(other) {
        return this.namespace === other.namespace && this.path === other.path;
    }
    static isValidNamespace(namespace) {
        return /^[a-z0-9._-]+$/.test(namespace);
    }
    static isValidPath(path) {
        return /^[a-z0-9/._-]+$/.test(path);
    }
    getNamespace() {
        return this.split(":")[0];
    }
    getPath() {
        return this.split(":")[1];
    }
}
//# sourceMappingURL=Identifier.js.map