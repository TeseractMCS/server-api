type Constructor<T = {}> = new (...args: any[]) => T;
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
type StaticProperties<T> = {
    [K in keyof T]: T[K];
};
export default function Mixin<TBases extends Constructor[]>(...bases: TBases): Constructor<UnionToIntersection<InstanceType<TBases[number]>>> & UnionToIntersection<StaticProperties<TBases[number]>>;
export {};
