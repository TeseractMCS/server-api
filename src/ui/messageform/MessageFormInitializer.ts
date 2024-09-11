import { Player } from "@minecraft/server";
import { MessageFormData } from "@minecraft/server-ui";
import ForceOpenForm from "../../util/ui/ForceOpenForm";

class MessageFormInitializer extends MessageFormData {
    public static of(target: InstanceType<any>) {
        return new this(target);
    }

    public constructor(private data: InstanceType<any>) {
        super();
    }

    public async sendForm(player: Player) {
        await null;

        if (this.data.constructor["_button1"]) {
            const buttonText = this.data.constructor["_button1"].buttonText;
            this.button1(
                typeof buttonText === "function"
                    ? buttonText.call(this.data, player)
                    : buttonText,
            );
        }
        if (this.data.constructor["_button2"]) {
            const buttonText = this.data.constructor["_button2"].buttonText;
            this.button2(
                typeof buttonText === "function"
                    ? buttonText.call(this.data, player)
                    : buttonText,
            );
        }

        const title = this.data.constructor["_formdata"]["title"];
        const body = this.data.constructor["_formdata"]["body"];

        if (title)
            this.title(
                typeof title === "function"
                    ? title.call(this.data, player)
                    : title,
            );

        if (body)
            this.body(
                typeof body === "function"
                    ? body.call(this.data, player)
                    : body,
            );

        const response = await ForceOpenForm(player, this);

        if (response.canceled) {
            const canceled = this.data.constructor["_canceled"];
            canceled?.call(this.data, player);
            return;
        }

        if (
            response.selection === 0 &&
            this.data.constructor["_button1"]?.callback
        ) {
            this.data.constructor["_button1"].callback.call(this.data, player);
        } else if (
            response.selection === 1 &&
            this.data.constructor["_button2"]?.callback
        ) {
            this.data.constructor["_button2"].callback.call(this.data, player);
        }
    }
}

export default MessageFormInitializer;
