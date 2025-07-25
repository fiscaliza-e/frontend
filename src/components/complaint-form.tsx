import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Upload, Button, message, Card, Row, Col, Tooltip } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useComplaints } from '../hooks/use-complaints';
import { useDepartments } from '../hooks/use-departments';
import { ComplaintRequest } from '../types/complaint';

const { TextArea } = Input;
const { Option } = Select;

interface ComplaintFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  initialValues?: Partial<ComplaintRequest & { id?: number }>;
  editMode?: boolean;
  onSubmit?: (values: any) => Promise<void>;
}

export function ComplaintForm({ onSuccess, onCancel, initialValues, editMode = false, onSubmit }: ComplaintFormProps) {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);
  const [cepLoading, setCepLoading] = useState(false);
  
  const { createComplaint, isLoading, error } = useComplaints();
  const { departments, isLoading: departmentsLoading } = useDepartments();

  useEffect(() => {
    if (initialValues) {
      const address: any = initialValues.address || {};
      form.setFieldsValue({
        ...initialValues,
        street: address.street || (initialValues as any).street || '',
        number: address.number || (initialValues as any).number || '',
        complement: address.complement || (initialValues as any).complement || '',
        neighborhood: address.neighborhood || (initialValues as any).neighborhood || '',
        city: address.city || (initialValues as any).city || '',
        state: address.state || (initialValues as any).state || '',
        zipCode: address.zipCode || (initialValues as any).zipCode || '',
      });
    }
  }, [initialValues, form]);

  const handleSubmit = async (values: any) => {
    try {
      if (onSubmit) {
        await onSubmit({ ...values, attachments: fileList.map(file => file.originFileObj) });
        onSuccess?.();
        return;
      }
      const complaintData: ComplaintRequest = {
        title: values.title,
        description: values.description,
        departmentId: values.departmentId,
        address: {
          street: values.street,
          number: values.number,
          complement: values.complement,
          neighborhood: values.neighborhood,
          city: values.city,
          state: values.state,
          zipCode: values.zipCode,
        },
        attachments: fileList.map(file => file.originFileObj),
      };

      await createComplaint(complaintData);
      message.success('Reclamação criada com sucesso!');
      form.resetFields();
      setFileList([]);
      onSuccess?.();
    } catch (error: any) {
      message.error(error.message || 'Erro ao criar reclamação');
    }
  };

  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, "");
    form.setFieldValue("zipCode", cep);
    if (cep.length === 8) {
      setCepLoading(true);
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await res.json();
        if (!data.erro) {
          form.setFieldsValue({
            street: data.logradouro || "",
            neighborhood: data.bairro || "",
            city: data.localidade || "",
            state: data.uf || "",
          });
        }
      } catch (err) {
        // Silenciar erro
      } finally {
        setCepLoading(false);
      }
    }
  };

  const uploadProps = {
    fileList,
    beforeUpload: () => false,
    onChange: ({ fileList }: any) => setFileList(fileList),
    multiple: true,
  };

  return (
    <Card title={editMode ? "Editar Reclamação" : "Nova Reclamação"} style={{ maxWidth: 600, minWidth: 400, margin: '0 auto' }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        disabled={isLoading}
        style={{ width: '100%' }}
      >
        <Form.Item
          name="title"
          label="Título"
          rules={[{ required: true, message: 'Por favor, insira o título' }]}
        >
          <Input placeholder="Digite o título da reclamação" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Descrição"
          rules={[{ required: true, message: 'Por favor, insira a descrição' }]}
        >
          <TextArea
            rows={4}
            placeholder="Descreva detalhadamente o problema"
          />
        </Form.Item>

        <Form.Item
          name="departmentId"
          label="Departamento"
          rules={[{ required: true, message: 'Por favor, selecione o departamento' }]}
        >
          <Select
            placeholder="Selecione o departamento responsável"
            loading={departmentsLoading}
          >
            {departments.map(dept => (
              <Option key={dept.id} value={dept.id}>
                {dept.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Card title="Endereço" size="small" style={{ marginBottom: 16 }}>
          <Row gutter={16}>
            <Col span={16}>
              <Form.Item
                name="street"
                label="Rua"
                rules={[{ required: true, message: 'Por favor, insira a rua' }]}
              >
                <Input placeholder="Nome da rua" disabled />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="number"
                label="Número"
                rules={[{ required: true, message: 'Por favor, insira o número' }]}
              >
                <Input placeholder="Número" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="complement" label="Complemento">
                <Input placeholder="Apartamento, bloco, etc." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="neighborhood"
                label="Bairro"
                rules={[{ required: true, message: 'Por favor, insira o bairro' }]}
              >
                <Input placeholder="Nome do bairro" disabled />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="city"
                label="Cidade"
                rules={[{ required: true, message: 'Por favor, insira a cidade' }]}
              >
                <Input placeholder="Nome da cidade" disabled />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="state"
                label="Estado"
                rules={[{ required: true, message: 'Por favor, insira o estado' }]}
              >
                <Input placeholder="Sigla do estado" disabled />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="zipCode"
                label="CEP"
                rules={[{ required: true, message: 'Por favor, insira o CEP' }]}
              >
                <Input
                  placeholder="00000-000"
                  onChange={handleCepChange}
                  maxLength={8}
                  suffix={cepLoading ? <span>Carregando...</span> : null}
                />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {error && (
          <div style={{ color: 'red', marginBottom: 16 }}>
            {error}
          </div>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading} style={{ background: 'var(--color-primary)', borderColor: 'var(--color-primary)' }}>
            {editMode ? "Salvar Alterações" : "Enviar Reclamação"}
          </Button>
          {onCancel && (
            <Button style={{ marginLeft: 8 }} onClick={onCancel}>
              Cancelar
            </Button>
          )}
        </Form.Item>
      </Form>
    </Card>
  );
} 