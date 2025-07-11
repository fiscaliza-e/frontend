import React, { useState } from 'react';
import { Form, Input, Select, Upload, Button, message, Card } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useComplaints } from '../hooks/use-complaints';
import { useDepartments } from '../hooks/use-departments';
import { ComplaintRequest } from '../types/complaint';

const { TextArea } = Input;
const { Option } = Select;

interface ComplaintFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function ComplaintForm({ onSuccess, onCancel }: ComplaintFormProps) {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);
  
  const { createComplaint, isLoading, error } = useComplaints();
  const { departments, isLoading: departmentsLoading } = useDepartments();

  const handleSubmit = async (values: any) => {
    try {
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

  const uploadProps = {
    fileList,
    beforeUpload: () => false,
    onChange: ({ fileList }: any) => setFileList(fileList),
    multiple: true,
  };

  return (
    <Card title="Nova Reclamação" style={{ maxWidth: 800, margin: '0 auto' }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        disabled={isLoading}
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
          <Form.Item
            name="street"
            label="Rua"
            rules={[{ required: true, message: 'Por favor, insira a rua' }]}
          >
            <Input placeholder="Nome da rua" />
          </Form.Item>

          <Form.Item
            name="number"
            label="Número"
            rules={[{ required: true, message: 'Por favor, insira o número' }]}
          >
            <Input placeholder="Número" />
          </Form.Item>

          <Form.Item name="complement" label="Complemento">
            <Input placeholder="Apartamento, bloco, etc." />
          </Form.Item>

          <Form.Item
            name="neighborhood"
            label="Bairro"
            rules={[{ required: true, message: 'Por favor, insira o bairro' }]}
          >
            <Input placeholder="Nome do bairro" />
          </Form.Item>

          <Form.Item
            name="city"
            label="Cidade"
            rules={[{ required: true, message: 'Por favor, insira a cidade' }]}
          >
            <Input placeholder="Nome da cidade" />
          </Form.Item>

          <Form.Item
            name="state"
            label="Estado"
            rules={[{ required: true, message: 'Por favor, insira o estado' }]}
          >
            <Input placeholder="Sigla do estado" />
          </Form.Item>

          <Form.Item
            name="zipCode"
            label="CEP"
            rules={[{ required: true, message: 'Por favor, insira o CEP' }]}
          >
            <Input placeholder="00000-000" />
          </Form.Item>
        </Card>

        <Form.Item label="Anexos">
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Selecionar arquivos</Button>
          </Upload>
        </Form.Item>

        {error && (
          <div style={{ color: 'red', marginBottom: 16 }}>
            {error}
          </div>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Enviar Reclamação
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