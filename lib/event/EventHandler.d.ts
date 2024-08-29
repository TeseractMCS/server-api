import "reflect-metadata";
export default function EventHandler(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<(event: any) => void>): void;
