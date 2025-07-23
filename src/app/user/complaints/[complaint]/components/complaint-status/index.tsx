import { Flex } from "antd";
import styles from "./complaint-status.module.css";

import { Typography } from "antd";
const { Title, Text } = Typography;

import classNames from "classnames";

interface Props {
  title: String;
  status: String;
  date: String;
}

export default function ComplaintStatus(props: Props) {
  const statusClass = props.status.replace(/\s/g, "");

  return (
    <Flex vertical>
      <Title level={4}> {props.title}</Title>
      <Typography.Paragraph
        className={classNames(styles.statusLabel, styles[statusClass])}
      >
        {props.status}
      </Typography.Paragraph>

      <Text type="secondary">Registrado em: {props.date}</Text>
    </Flex>
  );
}
