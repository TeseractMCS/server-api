import { Player, RawMessage } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui";
import ForceOpenForm from "../../util/ui/ForceOpenForm";

class ActionFormIntializer {
    private form: ActionFormData;
    private beingSent: boolean = false;
    private isCancelled = false;

    public static of(target: InstanceType<any>) {
        return new this(target);
    }
    
    public constructor(private data: InstanceType<any>) {
        this.form = new ActionFormData();
    }

    /**
     * Cancel the form delivery.
     */
    public cancel() {
        this.isCancelled = true;
    }

    /**
     * Set the title of the form.
     * @param newTitle New title to set.
     */
    public setTitle(newTitle: string | RawMessage) {
        this.form.title(newTitle);
    }

    /**
     * Set the body of the form.
     * @param newTitle New body to set.
     */
    public setBody(newTitle: string | RawMessage) {
        this.form.body(newTitle);
    }

    public appendButton(
        callback: (player: Player, selection: number) => void,
        buttonText: string | RawMessage,
        iconPath: string,
    ) {
        this.data.constructor["_buttons"].push({
            buttonText,
            iconPath,
            callback: callback,
        });
    }

    public async sendForm(player: Player) {
        if (this.beingSent) {
            LOGGER.warn(
                "Form '" +
                    this.data.constructor.name +
                    "' is already being initialized and prior sent to '" +
                    player.name +
                    "'",
            );
            return;
        }

        this.beingSent = true;

        await null;

        const title = this.data.constructor["_formdata"]["title"];
        const body = this.data.constructor["_formdata"]["body"];

        if (title)
            this.form.title(
                typeof title === "function"
                    ? title.call(this.data, player)
                    : title,
            );

        if (body)
            this.form.body(
                typeof body === "function"
                    ? body.call(this.data, player)
                    : body,
            );

        this.data.constructor["_onInitialized"]?.call(this.data, this, player);

        for (const button of this.data.constructor["_buttons"]) {
            const text =
                typeof button.buttonText === "function"
                    ? button.buttonText.call(this.data, player)
                    : button.buttonText;
            this.form.button(
                text,
                typeof button.iconPath === "function"
                    ? button.iconPath.call(this.data, player)
                    : button.iconPath,
            );
        }

        if (this.isCancelled) {
            this.isCancelled = false;
            return;
        }

        const response = await ForceOpenForm(player, this.form);

        if (response.canceled) {
            const canceled = this.data.constructor["_canceled"];
            canceled?.call(this.data, player, response.cancelationReason);
            return;
        }

        const selectedButton =
            this.data.constructor["_buttons"][response.selection];
        if (selectedButton && selectedButton.callback) {
            selectedButton.callback.call(this, player, response.selection);
        }
    }
}

export default ActionFormIntializer;
