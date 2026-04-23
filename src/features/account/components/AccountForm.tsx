import type { CreateAccountRequest } from "../types/account.types";
import { Form, Input, Button, InputNumber } from "antd";

type Props = {
  onSubmit: (data: CreateAccountRequest) => void;
};

export default function AccountForm({ onSubmit }: Props) {
  const handleSubmit = (values: CreateAccountRequest) => {
    onSubmit(values);
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        layout="vertical"
        label="Account Number"
        name="accountNumber"
        rules={[{ required: true, message: "Please input account number!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        layout="vertical"
        label="Owner Name"
        name="ownerName"
        rules={[{ required: true, message: "Please input owner name!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        layout="vertical"
        label="Initial Balance"
        name="balance"
        rules={[
          { required: true, message: "Please input initial balance!" },
          {
            validator: (_, value) => {
              if (value === undefined || value === null) {
                return Promise.reject("Please input initial balance!");
              }
              if (value < 0) {
                return Promise.reject("Please input a positive number!");
              }
              return Promise.resolve();
            },
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item className="text-right">
        <Button type="primary" htmlType="submit">
          Create Account
        </Button>
      </Form.Item>
    </Form>
  );
}
