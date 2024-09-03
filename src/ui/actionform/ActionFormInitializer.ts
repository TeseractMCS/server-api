import { Player } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import ForceOpenForm from "../../util/ui/ForceOpenForm";

class ActionFormIntializer extends ActionFormData {
    public static of(target: InstanceType<any>) {
        return new this(target);
    }
    
    public constructor(private data: InstanceType<any>) {
        super();
    }

    public async sendForm(player: Player) {
        await null;
        for (const button of this.data.constructor["_buttons"]) {
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

        const selectedButton =
            this.data.constructor["_buttons"][response.selection];
        if (selectedButton && selectedButton.callback) {
            selectedButton.callback.call(this, player);
        }
    }
}

export default ActionFormIntializer;
