// type Constructor<T = {}> = new (...args: any[]) => T;
// type BConstructor<T = {}> = new (...args: any[]) => T;

// type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
//     k: infer I,
// ) => void
//     ? I
//     : never;

// type ConstructorParametersList<TBases extends Constructor[]> = {
//     [K in keyof TBases]: TBases[K] extends Constructor<infer U>
//         ? ConstructorParameters<TBases[K]>
//         : never;
// };

// type Flatten<T> = T extends any[] ? T[number] : never;

// type StaticProperties<T> = {
//     [K in keyof T]: T[K];
// };

// export default function Mixin<TBases extends Constructor[]>(...bases: TBases) {
//     type BaseInstances = UnionToIntersection<InstanceType<TBases[number]>>;
//     type ConstructorArgs = Flatten<ConstructorParametersList<TBases>>;

//     class Combined {
//         private __baseInstances: any[];

//         public constructor(...args: ConstructorArgs[]) {
//             let offset = 0;
//             this.__baseInstances = bases.map((Base) => {
//                 const paramCount = Base.length;
//                 const baseArgs = args.slice(offset, offset + paramCount);
//                 offset += paramCount;
//                 return new Base(...baseArgs);
//             });
//             this.__baseInstances.forEach((baseInstance) => {
//                 Object.getOwnPropertyNames(baseInstance).forEach((name) => {
//                     console.warn("STOOOOOOOOP THIS MEME",baseInstance.constructor.name, baseInstance.constructor)
//                     if (!Object.prototype.hasOwnProperty.call(this, name)) {
                        
//                         if (baseInstance.constructor.name == "Runnable") {
//                             console.warn("WEEEI q bugaso");
//                             (this as any)[name] = baseInstance[name].bind(this);
//                         } else (this as any)[name] = baseInstance[name];
//                     }
//                 });
//             });
//         }

//         __getBaseInstance<T>(Base: Constructor<T>): T {
//             const baseInstance = this.__baseInstances.find(
//                 (instance) => instance instanceof Base,
//             );
//             if (!baseInstance) {
//                 throw new Error(`Base instance not found for ${Base.name}`);
//             }
//             return baseInstance as T;
//         }
//     }

//     bases.forEach((Base) => {
//         // Copiar propiedades estáticas de las clases base a la clase combinada
//         Object.getOwnPropertyNames(Base).forEach((name) => {
//             // console.warn(name)
//             if (
//                 name !== "prototype" &&
//                 name !== "name" &&
//                 name !== "length" &&
//                 name !== "__eventHandlers"
//             ) {
//                 Object.defineProperty(Combined, name, {
//                     get() {
//                         return (Base as any)[name];
//                     },
//                     set(value) {
//                         (Base as any)[name] = value;
//                     },
//                 });
//             }
//         });

//         Object.getOwnPropertyNames(Base.prototype).forEach((name) => {
//             // console.warn(name, Base.name)
//             if (name !== "constructor" && name !== "__eventHandlers") {
//                 Object.defineProperty(Combined.prototype, name, {
//                     get() {
//                         const instance = (this as any).__getBaseInstance(Base);
//                         const method = instance[name];
//                         return method.bind(instance);
//                     },
//                 });
//             }
//         });
//     });

//     type StaticProps = UnionToIntersection<
//         StaticProperties<(typeof bases)[number]>
//     >;

//     return Combined as Constructor<BaseInstances> & StaticProps;
// }

type Constructor<T = {}> = new (...args: any[]) => T;
type BConstructor<T = {}> = new (...args: any[]) => T;

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
    k: infer I,
) => void
    ? I
    : never;

type ConstructorParametersList<TBases extends Constructor[]> = {
    [K in keyof TBases]: TBases[K] extends Constructor<infer U>
    ? ConstructorParameters<TBases[K]>
    : never;
};

type Flatten<T> = T extends any[] ? T[number] : never;

type StaticProperties<T> = {
    [K in keyof T]: T[K];
};

export default function Mixin<TBases extends Constructor[]>(...bases: TBases) {
    type BaseInstances = UnionToIntersection<InstanceType<TBases[number]>>;
    type ConstructorArgs = Flatten<ConstructorParametersList<TBases>>;

    class Combined {
        private __baseInstances: any[];
        private static __combinedInstance: Combined

        public constructor(...args: ConstructorArgs[]) {
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
                        (this as any)[name] = baseInstance[name];
                    }
                });
            });
            Combined.__combinedInstance = this;
        }

        static getCombinedInstance() {
            return this.__combinedInstance
        }
        
        __getBaseInstance<T>(Base: Constructor<T>): T {
            const baseInstance = (this).__baseInstances?.find(
                (instance) => instance instanceof Base,
            );
            if (!baseInstance) {
                throw new Error(`Base instance not found for ${Base.name}`);
            }
            return baseInstance as T;
        }
    }

    bases.forEach((Base) => {
        Object.getOwnPropertyNames(Base).forEach((name) => {

            if (
                name !== "prototype" &&
                name !== "name" &&
                name !== "length" &&
                name !== "__eventHandlers"
            ) {
                Object.defineProperty(Combined, name, {
                    get() {
                        return (Base as any)[name];
                    },
                    set(value) {
                        (Base as any)[name] = value;
                    },
                });
            }
        });
        Object.getOwnPropertyNames(Base.prototype).forEach((name) => {
            if (name !== "constructor" && name !== "__eventHandlers") {
                Object.defineProperty(Combined.prototype, name, {
                    get() {
                        const instance = (this as any).__getBaseInstance(Base);
                        const method = instance[name];
                        return method.bind(Combined.getCombinedInstance());
                    },
                });
            }
        });
    });

    type StaticProps = UnionToIntersection<
        StaticProperties<(typeof bases)[number]>
    >;
    //@ts-ignore
    return Combined as Constructor<BaseInstances> & StaticProps;
}
