import { Flex } from "antd";
import React from "react";

import styles from "./card.module.css";

interface Props {
  title: string;
  titleClassName?: string;
  children: React.ReactNode;
}

const Card = ({ title, titleClassName, children }: Props) => {
  return (
    <Flex className={styles.card} vertical>
      <h3 className={titleClassName}>{title}</h3>
      {children}
    </Flex>
  );
};

export default Card;
