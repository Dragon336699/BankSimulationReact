import { Button, Form, Input, InputNumber } from "antd";
import type { TransferRequest } from "../types/account.types";

type Props = {
  onSubmit: (value: TransferRequest) => void;
  sourceAccountNumber: string;
};

export default function TransferForm({ onSubmit, sourceAccountNumber }: Props) {
  const handleSubmit = (values: TransferRequest) => {
    onSubmit(values);
  };
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        layout="vertical"
        label="Source Account Number"
        name="sourceAccountNumber"
        initialValue={sourceAccountNumber}
        rules={[
          { required: true, message: "Please input source account number!" },
        ]}
      >
        <Input defaultValue={sourceAccountNumber} disabled />
      </Form.Item>
      <Form.Item
        layout="vertical"
        label="Destination Account Number"
        name="destinationAccountNumber"
        rules={[
          {
            required: true,
            message: "Please input destination account number!",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        layout="vertical"
        label="Amount"
        name="amount"
        rules={[
          { required: true, message: "Please input transfer amount!" },
          {
            validator: (_, value) => {
              if (value === undefined || value === null) {
                return Promise.reject("Please input transfer amount!");
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
        <Form.Item
          layout="vertical"
          label="Description"
          name="description"
          rules={[
            {max: 300, message: 'Description must be at most 300 characters'}
          ]}
        >
          <Input />
        </Form.Item>
      <Form.Item className="text-right">
        <Button type="primary" htmlType="submit">
          Transfer
        </Button>
      </Form.Item>
    </Form>
  );
}
