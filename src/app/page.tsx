"use client";
import Card from "@/components/navigation-card";
import data from "@/mock/home-cards";
import styles from "./page.module.css";
import "./globals.css";

export default function Home() {
  return (
    <>
      <div className={styles.homeContainer}>
        <h3 className={styles.homeTitle}>
          Escolha a área da sua solicitação para começar ou entre com sua conta
          para acompanhar seus protocolos.
        </h3>
        <div className={styles.homeCardContainer}>
          {data.map((card) => (
            <Card
              iconPath={card.iconPath}
              title={card.title}
              description={card.description}
              onClick={() => {}}
            />
          ))}
        </div>
      </div>
    </>
  );
}
