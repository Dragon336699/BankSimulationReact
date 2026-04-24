import type { WithdrawRequest } from "../types/account.types";
import { Button, Form, Input, InputNumber } from "antd";

type Props = {
  onSubmit: (data: WithdrawRequest) => void;
  accountNumber: string;
};

export function WithdrawForm({ onSubmit, accountNumber }: Props) {
  const handleSubmit = (values: WithdrawRequest) => {
    onSubmit(values);
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        layout="vertical"
        label="Account Number"
        name="accountNumber"
        initialValue={accountNumber}
        rules={[{ required: true, message: "Please input account number!" }]}
      >
        <Input defaultValue={accountNumber} disabled />
      </Form.Item>
      <Form.Item
        layout="vertical"
        label="Amount"
        name="amount"
        rules={[
          { required: true, message: "Please input withdrawal amount!" },
          {
            validator: (_, value) => {
              if (value === undefined || value === null) {
                return Promise.reject("Please input withdrawal amount!");
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
          Withdraw
        </Button>
      </Form.Item>
    </Form>
  );
}
