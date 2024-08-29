export default function Description(description) {
    return function (target, propertyKey, descriptor) {
        if (!target.__commandData) {
            target.__commandData = {};
        }
        if (descriptor) {
            if (!target.__commandData[propertyKey]) {
                target.__commandData[propertyKey] = {};
            }
            target.__commandData[propertyKey].description = description.trim();
        }
        else {
            target.__commandData.description = description.trim();
        }
    };
}
//# sourceMappingURL=Description.js.map