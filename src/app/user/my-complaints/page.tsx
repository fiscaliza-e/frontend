"use client";

import { Flex } from "antd";

import styles from "./my-complaints.module.css";
import FilterComplaints from "./components/filter-complaints/filter-complaints";
import ComplaintsList from "./components/complaint-list/complaint-list";
import { useState } from "react";

export default function MyComplaints() {
  const [status, setStatus] = useState("all");

  const handleSetStatus = (value: string) => {
    setStatus(value);
  };

  return (
    <Flex
      vertical
      justify="center"
      align="center"
      className={styles.mainContainer}
    >
      <FilterComplaints onChange={handleSetStatus} />
      <ComplaintsList status={status} />
    </Flex>
  );
}
