"use client";
import { Button, Flex } from "antd";
import ComplaintStatus from "./components/complaint-status";
import ComplaintAddress from "./components/complaint-address";
import ComplaintObservations from "./components/complaint-observations";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Complaint from "@/models/complaint/complaint";
import complaints from "@/mock/complaints";

import ComplaintRegister from "./components/complaint-register/index";

import styles from "./complaint-details.module.css";

export default function ComplaintDetails() {
  const params = useParams();
  const complaintID = Number(params.complaint);

  const [data, setData] = useState<Complaint | null>(null);
  const [photo, setPhoto] = useState("");

  const handleSetPhoto = (data: Number) => {};

  useEffect(() => {
    if (complaintID) {
      const found = complaints.find(
        (c) => c.id === complaintID
      ) as unknown as Complaint | null;
      setData(found || null);
      found ? handleSetPhoto(found.id) : console.log("imagem não encontrada");
    }
  }, [complaintID]);

  if (!data) return <p>Carregando ou não encontrado...</p>;

  return (
    <Flex
      className={styles.complaintDetailsContainer}
      align="left"
      justify="center"
      vertical
      gap={24}
    >
      <Flex justify="space-between">
        <ComplaintStatus
          title={data.title}
          status={data.status}
          date={String(data.complaintDate)}
        />
        <Button
          className={styles.myComplaintsButton}
          onClick={() => {
            console.log("clicou");
          }}
          type="primary"
        >
          Arquivar
        </Button>
      </Flex>

      <Flex justify="space-between">
        <ComplaintRegister
          imagePath={"/icons/estrada.svg"}
          description={data.description}
        />
        <Flex vertical className={styles.complaintDetailsInfo}>
          <ComplaintAddress addressID={1} />
          <ComplaintObservations data={data.description} />
        </Flex>
      </Flex>
    </Flex>
  );
}
