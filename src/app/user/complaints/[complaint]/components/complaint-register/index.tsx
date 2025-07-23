import Card from "@/components/card";
import { Flex } from "antd";
import { Typography } from "antd";
const { Title } = Typography;

import styles from "./complaint-register.module.css";
import Image from "next/image";

interface Props {
  imagePath: string;
  description: string;
}

export default function ComplaintRegister(props: Props) {
  return (
    <Card>
      <Flex
        justify="space-between"
        vertical
        className={styles.complaintRegisterContainer}
      >
        <Flex vertical>
          <Title level={4}>Registro</Title>
          <Image
            src={props.imagePath}
            alt={props.description}
            width={100}
            height={100}
            className={styles.complaintPhoto}
          />
        </Flex>
        <Flex vertical>
          <Title level={4}>Descrição</Title>
          <Typography.Paragraph>{props.description}</Typography.Paragraph>
        </Flex>
      </Flex>
    </Card>
  );
}
