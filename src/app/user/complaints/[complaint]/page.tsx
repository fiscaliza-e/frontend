"use client";
import { Button, Flex, Tooltip, Modal } from "antd";
import ComplaintStatus from "./components/complaint-status";
import ComplaintAddress from "./components/complaint-address";
import ComplaintObservations from "./components/complaint-observations";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Complaint from "@/models/complaint/complaint";

import ComplaintRegister from "./components/complaint-register/index";
import { useComplaints } from "@/hooks/use-complaints";
import { ComplaintForm } from "@/components/complaint-form";

import styles from "./complaint-details.module.css";

export default function ComplaintDetails() {
  const params = useParams();
  const complaintID = Number(params.complaint);

  console.log('params:', params);
  console.log('complaintID:', complaintID);

  const { fetchComplaintById, currentComplaint, isLoading, deleteComplaint } = useComplaints();
  const [archiving, setArchiving] = useState(false);
  const [messageApi, contextHolder] = require('antd').message.useMessage();
  const router = require('next/navigation').useRouter();
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    console.log('useEffect - complaintID:', complaintID);
    if (complaintID) {
      fetchComplaintById(complaintID);
    }
  }, [complaintID, fetchComplaintById]);

  console.log('currentComplaint:', currentComplaint);
  console.log('isLoading:', isLoading);

  if (isLoading) return <p>Carregando...</p>;
  if (!currentComplaint) return <p>Não encontrado...</p>;

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
          title={currentComplaint.title}
          status={currentComplaint.status}
          date={String(currentComplaint.complaintDate)}
        />
        {contextHolder}
        <Flex gap={8} style={{ width: 260 }}>
          <Button
            type="default"
            style={{ minWidth: 120, width: '50%', height: '35px' }}
            onClick={() => setEditModalOpen(true)}
          >
            Editar
          </Button>
          <Button
            className={styles.myComplaintsButton}
            type="primary"
            loading={archiving}
            style={{ background: 'var(--color-primary)', borderColor: 'var(--color-primary)', minWidth: 120, width: '50%', height: '35px'  }}
            onClick={async () => {
              setArchiving(true);
              try {
                await deleteComplaint(currentComplaint.id);
                messageApi.success('Reclamação arquivada com sucesso!');
                setTimeout(() => router.push('/user/complaints'), 1000);
              } catch (err: any) {
                messageApi.error(err.message || 'Erro ao arquivar reclamação');
              } finally {
                setArchiving(false);
              }
            }}
            disabled={currentComplaint.status === "CLOSED"}
          >
            Arquivar
          </Button>
        </Flex>
      </Flex>

      <Flex gap={32} style={{ width: '100%' }}>
        <ComplaintRegister
          imagePath={"/icons/estrada.svg"}
          description={currentComplaint.description}
        />
        <Flex vertical className={styles.complaintDetailsInfo} style={{ flex: 1 }}>
          <ComplaintAddress address={currentComplaint.address} />
          {/* <ComplaintObservations data={currentComplaint.description} /> */}
        </Flex>
      </Flex>

      <Modal
        open={editModalOpen}
        onCancel={() => setEditModalOpen(false)}
        footer={null}
      >
        <ComplaintForm
          editMode
          initialValues={{
            ...currentComplaint,
            ...currentComplaint.address,
            departmentId: currentComplaint.departmentId,
            attachments: undefined,
          }}
          onCancel={() => setEditModalOpen(false)}
          onSuccess={async () => {
            setEditModalOpen(false);
            await fetchComplaintById(currentComplaint.id);
          }}
          onSubmit={async (values) => {
            await require('@/services/complaint-service').complaintService.updateComplaint(currentComplaint.id, values);
          }}
        />
      </Modal>
    </Flex>
  );
}
