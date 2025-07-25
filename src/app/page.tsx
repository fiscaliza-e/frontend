"use client";
import HomeNavigationCard from "@/components/home-navigation-card";
import styles from "./page.module.css";
import "./globals.css";
import { Flex, Row, Col, Spin } from "antd";
import { useRouter } from "next/navigation";
import { useDepartments } from "@/hooks/use-departments";

const iconMap: Record<string, string> = {
  "Iluminação": "/icons/iluminacao-publica.svg",
  "Pavimentação": "/icons/estrada.svg",
  "Saneamento": "/icons/agua.svg",
  "Órgãos públicos": "/icons/prefeitura.svg",
  "Espaço público": "/icons/progresso.svg",
  "Trânsito": "/icons/luzes-de-transito.svg",
};

const defaultIcon = "/icons/prefeitura.svg";

export default function Home() {
  const router = useRouter();
  const { departments, isLoading } = useDepartments();

  return (
    <Flex className={styles.page} vertical align="center">
      <h3 className={styles.homeTitle}>
        Escolha a área da sua solicitação para começar ou entre com sua conta
        para acompanhar seus protocolos.
      </h3>
      {isLoading ? (
        <Spin size="large" style={{ margin: 40 }} />
      ) : (
        <Row
          gutter={[16, 16]}
          justify="start"
          style={{ maxWidth: "1120px", width: "100%" }}
        >
          {departments.map((dep) => (
            <Col key={dep.id} xs={24} sm={12} md={8}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <HomeNavigationCard
                  iconPath={iconMap[dep.name] || defaultIcon}
                  title={dep.name}
                  description={dep.description || ""}
                  onClick={() => router.push(`/user/complaints/register?department=${encodeURIComponent(dep.id)}`)}
                />
              </div>
            </Col>
          ))}
        </Row>
      )}
    </Flex>
  );
}
