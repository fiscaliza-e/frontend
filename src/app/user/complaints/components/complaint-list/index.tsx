import { useEffect, useState } from "react";
import { Flex, Spin, Typography, Card, Empty, Tag, Button, message, Modal } from "antd";
import { complaintService } from "@/services/complaint-service";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import { useComplaints } from "@/hooks/use-complaints";
import { ComplaintForm } from "@/components/complaint-form";

const { Title, Text, Paragraph } = Typography;

interface Props {
  status: string;
}

const statusMap: Record<string, { color: string; label: string }> = {
  OPEN: { color: "green", label: "Encaminhada" },
  PENDING: { color: "#ffd700", label: "Pendente" },
  RESOLVED: { color: "#52c41a", label: "Resolvida" },
};

export default function ComplaintList({ status }: Props) {
  const [complaints, setComplaints] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { deleteComplaint } = useComplaints();
  const [archivingId, setArchivingId] = useState<number | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingComplaint, setEditingComplaint] = useState<any>(null);

  useEffect(() => {
    async function fetchComplaints() {
      setIsLoading(true);
      setError(null);
      try {
        const response = await complaintService.getComplaints();
        const data = Array.isArray(response)
          ? response
          : response.data?.complaints || response.data || [];
        setComplaints(data);
      } catch (err: any) {
        setError(err.message || "Erro ao buscar reclamações");
      } finally {
        setIsLoading(false);
      }
    }
    fetchComplaints();
  }, []);

  const filtered = status === "all"
    ? complaints
    : complaints.filter((c) => c.status === status);

  if (isLoading) {
    return (
      <Flex className={styles.complaintsContainer}>
        <Spin size="large" style={{ margin: 40 }} />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex className={styles.complaintsContainer}>
        <Text type="danger">{error}</Text>;
      </Flex>
    )
  }

  if (!filtered.length) {
    return (
      <Flex className={styles.complaintsContainer}>
        <Empty description="Nenhuma reclamação encontrada." style={{ margin: 40 }} />
      </Flex>
    )
  }

  return (
    <>
      <Flex className={styles.complaintsContainer} vertical gap={16}>
        {filtered.map((complaint) => {
          const statusInfo = statusMap[complaint.status] || { color: "default", label: complaint.status };
          return (
            <Card
              key={complaint.id}
              title={
                <Flex className={styles.cardTitle} align="center" justify="space-between">
                  <span>{complaint.title}</span>
                  <Flex gap={8}>
                    <Button
                      type="default"
                      size="small"
                      onClick={e => {
                        e.stopPropagation();
                        setEditingComplaint(complaint);
                        setEditModalOpen(true);
                      }}
                    >
                      Editar
                    </Button>
                    <Button
                      type="primary"
                      size="small"
                      loading={archivingId === complaint.id}
                      style={{ background: 'var(--color-primary)', borderColor: 'var(--color-primary)' }}
                      onClick={async (e) => {
                        e.stopPropagation();
                        setArchivingId(complaint.id);
                        try {
                          await deleteComplaint(complaint.id);
                          message.success('Reclamação arquivada com sucesso!');
                          // Atualizar lista após arquivar
                          setComplaints(prev => prev.filter(c => c.id !== complaint.id));
                        } catch (err: any) {
                          message.error(err.message || 'Erro ao arquivar reclamação');
                        } finally {
                          setArchivingId(null);
                        }
                      }}
                    >
                      Arquivar
                    </Button>
                  </Flex>
                </Flex>
              }
              className={styles.complaintCard}
              hoverable
              onClick={() => router.push(`/user/complaints/${complaint.id}`)}
            >
              <Paragraph className={styles.cardParagraph}>{complaint.description}</Paragraph>
              <Tag color={statusInfo.color} className={styles.cardTag}>{statusInfo.label}</Tag><br />
              <Text type="secondary" className={styles.cardDate}>Data: {complaint.complaint_date ? new Date(complaint.complaint_date).toLocaleDateString() : "-"}</Text>
            </Card>
          );
        })}
      </Flex>
      <Modal
        open={editModalOpen}
        onCancel={() => setEditModalOpen(false)}
        footer={null}
      >
        {editingComplaint && (
          <ComplaintForm
            editMode
            initialValues={{
              ...editingComplaint,
              address: editingComplaint.address || editingComplaint.addresses || {},
              departmentId: editingComplaint.departmentId || editingComplaint.department_id,
            }}
            onCancel={() => setEditModalOpen(false)}
            onSuccess={async () => {
              setEditModalOpen(false);
              // Refetch complaints
              setIsLoading(true);
              try {
                const response = await complaintService.getComplaints();
                const data = Array.isArray(response)
                  ? response
                  : response.data?.complaints || response.data || [];
                setComplaints(data);
              } finally {
                setIsLoading(false);
              }
            }}
            onSubmit={async (values) => {
              await complaintService.updateComplaint(editingComplaint.id, values);
            }}
          />
        )}
      </Modal>
    </>
  );
}
