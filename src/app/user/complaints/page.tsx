"use client";

import { Flex } from "antd";
import { AuthGuard } from "@/components/auth-guard";

import styles from "./page.module.css";
import ComplaintsFilter from "./components/complaints-filter";
import ComplaintsList from "./components/complaint-list";
import { useState } from "react";

export default function Complaints() {
  const [status, setStatus] = useState("all");

  const handleSetStatus = (value: string) => {
    setStatus(value);
  };

  return (
    <AuthGuard>
      <Flex
        vertical
        justify="center"
        align="center"
        className={styles.mainContainer}
      >
        <ComplaintsFilter onChange={handleSetStatus} />
        <ComplaintsList status={status} />
      </Flex>
    </AuthGuard>
  );
}
