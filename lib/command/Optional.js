import "reflect-metadata";
export default function Optional(target, propertyKey, parameterIndex) {
    if (!target.__optionalParameters) {
        target.__optionalParameters = {};
    }
    if (!target.__optionalParameters[propertyKey]) {
        target.__optionalParameters[propertyKey] = [];
    }
    target.__optionalParameters[propertyKey].push(parameterIndex);
    const paramTypes = Reflect.getMetadata("design:paramtypes", target, propertyKey);
    for (let i = 0; i < target.__optionalParameters[propertyKey].length; i++) {
        const optionalIndex = target.__optionalParameters[propertyKey][i];
        if (optionalIndex < paramTypes.length - 1 &&
            !target.__optionalParameters[propertyKey].includes(optionalIndex + 1)) {
            throw new Error(`Optional parameter at index ${optionalIndex} is followed by a required parameter at index ${optionalIndex + 1} at '${String(propertyKey)}' in @CommandAlias: '${target.constructor.name}'`);
        }
    }
}
//# sourceMappingURL=Optional.js.map