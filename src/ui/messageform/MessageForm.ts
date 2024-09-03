import FormType from "../FormType";

type Constructor<T = {}> = new (...args: any[]) => T;

function MessageForm(target: Constructor) {
    if (!target["_formdata"]) {
        target["_formdata"] = {};
    }
    target["_formdata"] = {
        type: FormType.MESSAGE,
    };
}

export default MessageForm;
