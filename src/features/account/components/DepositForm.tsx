import { Button, Form, Input, InputNumber } from "antd";
import type { DepositRequest } from "../types/account.types";

type Props = {
  onSubmit: (data: DepositRequest) => void;
  accountNumber: string;
};

export default function DepositForm({ onSubmit, accountNumber }: Props) {
  const handleSubmit = (values: DepositRequest) => {
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
          { required: true, message: "Please input deposit amount!" },
          {
            validator: (_, value) => {
              if (value === undefined || value === null) {
                return Promise.reject("Please input deposit amount!");
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
          Deposit
        </Button>
      </Form.Item>
    </Form>
  );
}
