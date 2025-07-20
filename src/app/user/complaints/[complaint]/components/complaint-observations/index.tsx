import Card from "@/components/card";
import { Flex } from "antd";
import Title from "antd/es/typography/Title";
import { Typography } from "antd";

interface Props {
  data: String;
}

export default function ComplaintObservations(props: Props) {
  return (
    <Card>
      <Flex vertical>
        <Title level={4}>Observações</Title>
        <Typography.Paragraph>{props.data}</Typography.Paragraph>
      </Flex>
    </Card>
  );
}
