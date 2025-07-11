"use client";
import HomeNavigationCard from "@/components/home-navigation-card";
import data from "@/mock/home-cards";
import styles from "./page.module.css";
import "./globals.css";
import { Flex, Row, Col } from "antd";

export default function Home() {
  return (
    <Flex className={styles.page} vertical align="center">
      <h3 className={styles.homeTitle}>
        Escolha a área da sua solicitação para começar ou entre com sua conta
        para acompanhar seus protocolos.
      </h3>

      <Row
        gutter={[16, 16]}
        justify="start"
        style={{ maxWidth: "1120px", width: "100%" }}
      >
        {data.map((card, index) => (
          <Col key={index} xs={24} sm={12} md={8}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <HomeNavigationCard
                iconPath={card.iconPath}
                title={card.title}
                description={card.description}
                onClick={() => {}}
              />
            </div>
          </Col>
        ))}
      </Row>
    </Flex>
  );
}
