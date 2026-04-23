import { message } from "antd";

export function useAppMessage() {
    const [messageApi, contextHolder] = message.useMessage();

    const showMessage = (type: "success" | "error" | "info" | "warning", content: string) => {
        messageApi.open({
            type,
            content,
        });
    }

    return {
        contextHolder,
        showMessage
    }
}