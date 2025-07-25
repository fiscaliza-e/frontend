"use client";

import { AuthGuard } from "@/components/auth-guard";

import ComplaintsFilter from "./components/complaints-filter";
import ComplaintList from "./components/complaint-list";
import { useState } from "react";
import styles from "./page.module.css";
import { Flex } from "antd";

export default function Complaints() {
  const [status, setStatus] = useState("all");
  const statuses = ["all", "PENDENTE", "EM ANDAMENTO", "ARQUIVADA"];

  const handleSetStatus = (value: string) => {
    setStatus(value);
  };

  return (
    <AuthGuard>
      <Flex
        className={styles.complaintsContent}
        vertical
        align="center"
        gap={8}
      >
        <Flex className={styles.complaintsFilter}>
          <ComplaintsFilter onChange={handleSetStatus} statuses={statuses} />
        </Flex>
        <Flex className={styles.complaintsList}>
          <ComplaintList status={status} />
        </Flex>
      </Flex>
    </AuthGuard>
  );
}
