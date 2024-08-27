export default function Description(description: string): any {
    return function (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor,
    ) {
        if (!target.__commandData) {
            target.__commandData = {};
        }
        if (descriptor) {
            if (!target.__commandData[propertyKey]) {
                target.__commandData[propertyKey] = {};
            }
            target.__commandData[propertyKey].description = description.trim();
        } else {
            target.__commandData.description = description.trim();
        }
    };
}
