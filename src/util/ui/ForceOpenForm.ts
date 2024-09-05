import { Player } from "@minecraft/server";
import {
    ActionFormData,
    ActionFormResponse,
    FormCancelationReason,
    MessageFormData,
    MessageFormResponse,
    ModalFormData,
    ModalFormResponse,
} from "@minecraft/server-ui";

type ResponseMap = {
    ActionFormData: ActionFormResponse;
    MessageFormData: MessageFormResponse;
    ModalFormData: ModalFormResponse;
};

type FormResponseType<T> = T extends ActionFormData
    ? ActionFormResponse
    : T extends MessageFormData
    ? MessageFormResponse
    : T extends ModalFormData
    ? ModalFormResponse
    : never;

async function ForceOpenForm<
    T extends ActionFormData | MessageFormData | ModalFormData,
>(player: Player, form: T): Promise<FormResponseType<T>> {
    return new Promise(async (resolve, reject) => {
        while (true) {
            try {
                // @ts-ignore
                const response = await form.show(player);
                if (
                    response?.cancelationReason !==
                    FormCancelationReason.UserBusy
                ) {
                    resolve(response as FormResponseType<T>);
                    break;
                }
            } catch (error) {
                reject(error);
                break;
            }
        }
    });
}

export default ForceOpenForm;
