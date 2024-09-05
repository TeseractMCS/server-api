import FormType from "../FormType";

type Constructor<T> = new (...args: any[]) => T;

function ActionForm<T>(target: Constructor<T>) {
    if (!target["_formdata"]) {
        target["_formdata"] = {};
    }
    target["_formdata"]["type"] = FormType.ACTION;
}

export default ActionForm;
