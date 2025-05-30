import Image from "next/image";

import styles from "./card.module.css";

interface Props {
  title: string;
  labelText: string;
  iconPath: string;
  onClick: () => void;
}

export default function Card(props: Props) {
  return (
    <div className={styles.cardDefault}>
      <div className={styles.cardTextContent}>
        <p className={styles.cardTitle}>{props.title}</p>
        <p className={styles.labelText}>{props.labelText}</p>
      </div>
      <img
        className={styles.iconCard}
        src={props.iconPath}
        alt={props.title}
      />
    </div>
  );
}
