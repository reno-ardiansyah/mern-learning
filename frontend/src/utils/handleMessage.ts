import { message } from "antd";

const [messageApi, contextHolder] = message.useMessage();

const handlemessage = (message: string = '', type: 'success' | 'error' | 'warning' = 'success') => {
  messageApi.open({
    type: type,
    content: message
  });
}

export {handlemessage, contextHolder}