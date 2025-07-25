import Card from "@/components/card";
import { Flex } from "antd";
import Title from "antd/es/typography/Title";
import { Typography } from "antd";
import "./styles.module.css";

interface Props {
  data: String;
}

export default function ComplaintObservations(props: Props) {
  return (
    <Card>
      <Flex vertical className="observationsContainer">
        <Title level={4}>Observações</Title>
        <Typography.Paragraph>{props.data}</Typography.Paragraph>
      </Flex>
    </Card>
  );
}
