import { Flex } from "antd";
import styles from "./styles.module.css";
import Image from "next/image";

interface Props {
  title: string;
  description: string;
  iconPath: string;
  onClick: () => void;
}

export default function HomeNavigationCard({
  title,
  description,
  iconPath,
  onClick,
}: Props) {
  return (
    <Flex className={styles.card} onClick={onClick} justify="space-between" align="center">
      <Flex className={styles.cardTextContent} justify="center">
        <p className={styles.cardTitle}>{title}</p>
        <p className={styles.description}>{description}</p>
      </Flex>
      <Flex className={styles.cardIcon} align="center" justify="center">
        <Image
          src={iconPath}
          alt={title}
          className={styles.iconImage}
          width={40}
          height={40}
        />
      </Flex>
    </Flex>
  );
}
