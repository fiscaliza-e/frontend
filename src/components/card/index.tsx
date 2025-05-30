

import styles from "./card.module.css";

interface Props {
  title: string;
  description: string;
  iconPath: string;
  onClick: () => void;
}

export default function Card({ title, description, iconPath, onClick }: Props) {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.cardTextContent}>
        <p className={styles.cardTitle}>{title}</p>
        <p className={styles.description}>{description}</p>
      </div>
      <img className={styles.cardIcon} src={iconPath} alt={title} />
    </div>
  );
}
