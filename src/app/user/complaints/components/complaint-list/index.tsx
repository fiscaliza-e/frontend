import { Flex } from "antd";
import Link from "next/link";

import { Typography } from "antd";
const { Title, Text } = Typography;

import styles from "./styles.module.css";
import complaints from "@/mock/complaints";
import classNames from "classnames";

interface Props {
  status: string;
}

export default function ComplaintList(props: Props) {
  return (
    <Flex
      vertical
      justify="center"
      align="center"
      className={styles.complaintsContainer}
    >
      {complaints
        .filter(
          (complaint) =>
            props.status === "all" || complaint.status === props.status
        )
        .map((complaint) => (
          <Link
            data-status={complaint.status}
            className={classNames(styles.cardComplaint, styles.elementHover)}
            key={complaint.id}
            href={`/user/complaints/${complaint.id}`}
          >
            <Flex justify="space-between" align="center">
              <Title level={2} className={styles.textElement}>
                {complaint.id}
              </Title>
              <Flex vertical className={styles.cardTextContent}>
                <Title level={4} className={styles.textElement}>
                  {complaint.title}
                </Title>
                <Typography.Paragraph>
                  {complaint.description}
                </Typography.Paragraph>
              </Flex>
              <Text type="secondary">{complaint.complaintDate}</Text>
            </Flex>
          </Link>
        ))}
    </Flex>
  );
}
