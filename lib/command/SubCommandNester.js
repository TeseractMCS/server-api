export default function SubCommandNester(obj, keys, target, propertyKey) {
    let current = obj;
    keys.forEach((key, index) => {
        const [name, ...aliases] = key.split("|").map((a) => a.trim());
        if (!current[name]) {
            current[name] = {
                name: name,
                aliases: aliases ?? [],
                subCommands: {},
            };
        }
        if (index === keys.length - 1) {
            if (!current[name].callbacks) {
                current[name].callbacks = [];
            }
            current[name].callbacks.push(propertyKey);
            current[name].permission =
                target.__commandData?.[propertyKey]?.permission;
            current[name].description =
                target.__commandData?.[propertyKey]?.description;
        }
        else {
            if (!current[name]?.permission) {
                current[name].permission =
                    target.__commandData?.[propertyKey]?.permission;
            }
            if (!current[name]?.description) {
                current[name].description =
                    target.__commandData?.[propertyKey]?.description;
            }
            current = current[name].subCommands;
        }
    });
}
//# sourceMappingURL=SubCommandNester.js.map