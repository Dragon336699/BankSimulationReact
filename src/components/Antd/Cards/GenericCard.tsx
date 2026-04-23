import { Card } from "antd";

type Props = {
    title?: string;
    children: React.ReactNode;
}

export default function GenericCard({title, children}: Props) {
    return <Card title={title}>{children}</Card>;
}