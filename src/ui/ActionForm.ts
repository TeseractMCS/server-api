import { Player, RawMessage } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import FormType from "./FormType";
import ForceOpenForm from "../util/ui/ForceOpenForm";

type Constructor<T = {}> = new (...args: any[]) => T;

function ActionForm(target: Constructor) {
    if (!target.constructor["_formdata"]) {
        target.constructor["_formdata"] = {};
    }
    target.constructor["_formdata"] = {
        type: FormType.ACTION,
    };
}

export abstract class ActionFormD extends ActionFormData {
    public constructor() {
        super();
    }

    public async sendForm(player: Player) {
        await null;
        for (const button of this.constructor["_buttons"]) {
            const text =
                typeof button.buttonText === "function"
                    ? button.buttonText(player)
                    : button.buttonText;
            this.button(text, button.iconPath);
        }

        const response = await ForceOpenForm(player, this);

        if (response.canceled) {
            return;
        }

        const selectedButton = this.constructor["_buttons"][response.selection];
        if (selectedButton && selectedButton.callback) {
            selectedButton.callback.call(this, player);
        }
    }
}

export default ActionForm;
