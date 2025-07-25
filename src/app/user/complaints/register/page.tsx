"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { Typography, Card, Flex, Form, Input, Button, message, Select, DatePicker, Spin } from "antd";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useAuth } from "@/hooks/use-auth";
import { useComplaints } from "@/hooks/use-complaints";
import { complaintService } from "@/services/complaint-service";
import { AuthGuard } from "@/components/auth-guard";

const { Title, Paragraph } = Typography;

export default function ComplaintRegisterPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const type = searchParams.get("type");
  const departmentId = searchParams.get("department");
  const { user } = useAuth();
  const { createComplaintWithAddress } = useComplaints();

  const [form] = Form.useForm();
  const [statuses, setStatuses] = useState<string[]>([]);
  const [isLoadingStatuses, setIsLoadingStatuses] = useState(true);
  const [errorStatuses, setErrorStatuses] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [addressFields, setAddressFields] = useState<any>({});
  const [showAddressFields, setShowAddressFields] = useState(false);
  const [cepLoading, setCepLoading] = useState(false);

  useEffect(() => {
    async function fetchStatuses() {
      setIsLoadingStatuses(true);
      setErrorStatuses(null);
      try {
        const res = await complaintService.getComplaintStatuses();
        setStatuses(res);
      } catch (err: any) {
        setErrorStatuses(err.message || "Erro ao buscar status");
        setStatuses(["PENDENTE", "OPEN", "RESOLVED"]);
      } finally {
        setIsLoadingStatuses(false);
      }
    }
    fetchStatuses();
  }, []);

  const handleCepChange = (e: any) => {
    const cep = e.target.value.replace(/\D/g, "");
    form.setFieldValue("zipCode", cep);
    if (cep.length === 8) {
      setCepLoading(true);
      fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(res => res.json())
        .then(data => {
          if (!data.erro) {
            setShowAddressFields(true);
            form.setFieldsValue({
              street: data.logradouro || "",
              neighborhood: data.bairro || "",
              city: data.localidade || "",
              state: data.uf || "",
              number: ""
            });
          } else {
            setShowAddressFields(false);
            form.setFieldsValue({
              street: "",
              neighborhood: "",
              city: "",
              state: "",
              number: ""
            });
          }
        })
        .catch(() => {
          setShowAddressFields(false);
        })
        .finally(() => {
          setCepLoading(false);
        });
    } else {
      setShowAddressFields(false);
      setCepLoading(false);
      form.setFieldsValue({
        street: "",
        neighborhood: "",
        city: "",
        state: "",
        number: ""
      });
    }
  };

  const handleCepBlur = async () => {
    const cep = form.getFieldValue("zipCode")?.replace(/\D/g, "");
    if (cep && cep.length === 8) {
      setCepLoading(true);
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await res.json();
        if (!data.erro) {
          setShowAddressFields(true);
          form.setFieldsValue({
            street: data.logradouro || "",
            neighborhood: data.bairro || "",
            city: data.localidade || "",
            state: data.uf || "",
            number: ""
          });
        } else {
          setShowAddressFields(false);
          form.setFieldsValue({
            street: "",
            neighborhood: "",
            city: "",
            state: "",
            number: ""
          });
        }
      } catch {
        setShowAddressFields(false);
      } finally {
        setCepLoading(false);
      }
    } else {
      setShowAddressFields(false);
      setCepLoading(false);
    }
  };

  const handleFinish = async (values: any) => {
    setLoading(true);
    try {
      const payload = {
        user_id: user?.id || 2,
        city_hall_user_id: 1,
        department_id: departmentId ? Number(departmentId) : 1,
        title: values.title,
        description: values.description,
        status: values.status,
        complaint_date: dayjs().format("YYYY-MM-DD"),
        address: {
          street: values.street,
          number: values.number,
          complement: values.complement,
          neighborhood: values.neighborhood,
          city: values.city,
          state: values.state,
          zipCode: values.zipCode,
        },
      };
      await createComplaintWithAddress(payload);
      message.success("Reclamação registrada com sucesso!");
      form.resetFields();
      setShowAddressFields(false);
      setAddressFields({});
      router.push("/user/complaints");
    } catch (err: any) {
      message.error(err.message || "Erro ao registrar reclamação");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthGuard>
      <Flex style={{ width: "100vw", minHeight: "80vh", background: "#f8f9fa" }} justify="center" align="flex-start">
        <Card style={{ width: "75vw", maxWidth: 1000, marginTop: 48, marginBottom: 48, borderRadius: 12, boxShadow: "0 2px 12px #0001" }}>
          <Title level={3}>Registrar Reclamação</Title>
          {isLoadingStatuses ? (
            <Spin style={{ margin: 32 }} />
          ) : errorStatuses ? (
            <Paragraph type="danger">Erro ao buscar status</Paragraph>
          ) : (
            <Form
              form={form}
              layout="vertical"
              onFinish={handleFinish}
              style={{ marginTop: 32 }}
            >
              <Form.Item
                label="Título"
                name="title"
                rules={[{ required: true, message: "Informe o título da reclamação" }]}
              >
                <Input placeholder="Ex: Buraco na rua" />
              </Form.Item>
              <Form.Item
                label="Descrição"
                name="description"
                rules={[{ required: true, message: "Descreva o problema" }]}
              >
                <Input.TextArea rows={5} placeholder="Descreva o problema detalhadamente..." />
              </Form.Item>
              <Flex gap={16} style={{ width: "100%" }}>
                <Form.Item
                  label="Status"
                  name="status"
                  rules={[{ required: true, message: "Selecione o status" }]}
                  initialValue={statuses[0]}
                  style={{ flex: 1 }}
                >
                  <Select placeholder="Selecione o status">
                    {statuses.map((s) => (
                      <Select.Option key={s} value={s}>{s}</Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item label="CEP" name="zipCode" rules={[{ required: true, message: "Informe o CEP" }]} style={{ flex: 1 }}>
                  <Input
                    onChange={handleCepChange}
                    maxLength={8}
                    suffix={cepLoading ? <Spin size="small" /> : <span style={{ width: 16, display: "inline-block" }} />}
                  />
                </Form.Item>
              </Flex>
              {showAddressFields && (
                <>
                  <Flex gap={16} style={{ width: "100%" }}>
                    <Form.Item label="Número" name="number" rules={[{ required: true, message: "Informe o número" }]} style={{ flex: 1, minWidth: 80, maxWidth: 120 }}> 
                      <Input />
                    </Form.Item>
                    <Form.Item label="Rua" name="street" rules={[{ required: true, message: "Informe a rua" }]} style={{ flex: 9 }}> 
                      <Input />
                    </Form.Item>
                  </Flex>
                  <Form.Item label="Complemento" name="complement"> 
                    <Input />
                  </Form.Item>
                  <Flex gap={16} style={{ width: "100%" }}>
                    <Form.Item label="Estado" name="state" rules={[{ required: true, message: "Informe o estado" }]} style={{ flex: 1 }}> 
                      <Input />
                    </Form.Item>
                    <Form.Item label="Cidade" name="city" rules={[{ required: true, message: "Informe a cidade" }]} style={{ flex: 2 }}> 
                      <Input />
                    </Form.Item>
                    <Form.Item label="Bairro" name="neighborhood" rules={[{ required: true, message: "Informe o bairro" }]} style={{ flex: 2 }}> 
                      <Input />
                    </Form.Item>
                  </Flex>
                </>
              )}
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: 200, background: "var(--color-primary)", borderColor: "var(--color-primary)" }}
                  loading={loading}
                >
                  Registrar Reclamação
                </Button>
              </Form.Item>
            </Form>
          )}
        </Card>
      </Flex>
    </AuthGuard>
  );
} 