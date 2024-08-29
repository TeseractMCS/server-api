// type Constructor<T = {}> = new (...args: any[]) => T;
// type BConstructor<T = {}> = new (...args: any[]) => T;
export default function Mixin(...bases) {
    class Combined {
        constructor(...args) {
            let offset = 0;
            this.__baseInstances = bases.map((Base) => {
                const paramCount = Base.length;
                const baseArgs = args.slice(offset, offset + paramCount);
                offset += paramCount;
                return new Base(...baseArgs);
            });
            this.__baseInstances.forEach((baseInstance) => {
                Object.getOwnPropertyNames(baseInstance).forEach((name) => {
                    if (!Object.prototype.hasOwnProperty.call(this, name)) {
                        this[name] = baseInstance[name];
                    }
                });
            });
            Combined.__combinedInstance = this;
        }
        static getCombinedInstance() {
            return this.__combinedInstance;
        }
        __getBaseInstance(Base) {
            const baseInstance = (this).__baseInstances?.find((instance) => instance instanceof Base);
            if (!baseInstance) {
                throw new Error(`Base instance not found for ${Base.name}`);
            }
            return baseInstance;
        }
    }
    bases.forEach((Base) => {
        Object.getOwnPropertyNames(Base).forEach((name) => {
            if (name !== "prototype" &&
                name !== "name" &&
                name !== "length" &&
                name !== "__eventHandlers") {
                Object.defineProperty(Combined, name, {
                    get() {
                        return Base[name];
                    },
                    set(value) {
                        Base[name] = value;
                    },
                });
            }
        });
        Object.getOwnPropertyNames(Base.prototype).forEach((name) => {
            if (name !== "constructor" && name !== "__eventHandlers") {
                Object.defineProperty(Combined.prototype, name, {
                    get() {
                        const instance = this.__getBaseInstance(Base);
                        const method = instance[name];
                        return method.bind(Combined.getCombinedInstance());
                    },
                });
            }
        });
    });
    //@ts-ignore
    return Combined;
}
//# sourceMappingURL=Mixin.js.map