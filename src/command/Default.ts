export default function Default(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
) {
    if (!descriptor) {
        throw new TypeError(
            `'${propertyKey}' is not a method, it cannot be tagged as Default.`,
        );
    }
    if (!target.constructor.__commandData) {
        target.constructor.__commandData = {};
    }
    if (!target.constructor.__commandData.defaults) {
        target.constructor.__commandData.defaults = [];
    }
    target.constructor.__commandData.defaults.push(propertyKey);
}
