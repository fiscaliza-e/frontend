import styles from "./navigation-card.module.css";
import Image from "next/image";

interface Props {
  title: string;
  description: string;
  iconPath: string;
  onClick: () => void;
}

export default function NavigationCard({
  title,
  description,
  iconPath,
  onClick,
}: Props) {
  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.cardTextContent}>
        <p className={styles.cardTitle}>{title}</p>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.cardIcon}>
        <Image
          src={iconPath}
          alt={title}
          className={styles.iconImage}
          width={48}
          height={48}
        />
      </div>
    </div>
  );
}
