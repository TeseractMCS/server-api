export default function Default(target, propertyKey, descriptor) {
    if (!descriptor) {
        throw new TypeError(`'${propertyKey}' is not a method, it cannot be tagged as Default.`);
    }
    if (!target.constructor.__commandData) {
        target.constructor.__commandData = {};
    }
    if (!target.constructor.__commandData.defaults) {
        target.constructor.__commandData.defaults = [];
    }
    target.constructor.__commandData.defaults.push(propertyKey);
}
//# sourceMappingURL=Default.js.map