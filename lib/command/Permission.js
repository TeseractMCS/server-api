export default function Permission(permission) {
    return function (target, propertyKey, descriptor) {
        if (!target.__commandData) {
            target.__commandData = {};
        }
        if (descriptor) {
            if (!target.__commandData[propertyKey]) {
                target.__commandData[propertyKey] = {};
            }
            target.__commandData[propertyKey].permission = permission;
        }
        else {
            target.__commandData.permission = permission;
        }
    };
}
//# sourceMappingURL=Permission.js.map