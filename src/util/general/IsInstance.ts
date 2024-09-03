function IsInstance(obj: any) {
    if (obj !== null && typeof obj === "object") {
        return obj.constructor !== Object;
    }
    return false;
}

export default IsInstance;
