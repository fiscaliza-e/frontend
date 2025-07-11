import React from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from '../hooks/use-auth';
import { LoginRequest } from '../types/auth';

interface LoginFormProps {
  onSuccess?: () => void;
  onRegisterClick?: () => void;
}

export function LoginForm({ onSuccess, onRegisterClick }: LoginFormProps) {
  const [form] = Form.useForm();
  const { login, isLoading, error } = useAuth();

  const handleSubmit = async (values: LoginRequest) => {
    try {
      await login(values);
      message.success('Login realizado com sucesso!');
      onSuccess?.();
    } catch (error: any) {
      message.error(error.message || 'Erro ao fazer login');
    }
  };

  return (
    <Card title="Login" style={{ maxWidth: 400, margin: '0 auto' }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        disabled={isLoading}
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            { required: true, message: 'Por favor, insira seu e-mail' },
            { type: 'email', message: 'Por favor, insira um e-mail válido' }
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Digite seu e-mail"
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="password"
          label="Senha"
          rules={[{ required: true, message: 'Por favor, insira sua senha' }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Digite sua senha"
            size="large"
          />
        </Form.Item>

        {error && (
          <div style={{ color: 'red', marginBottom: 16, textAlign: 'center' }}>
            {error}
          </div>
        )}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            size="large"
            block
          >
            Entrar
          </Button>
        </Form.Item>

        {onRegisterClick && (
          <Form.Item style={{ textAlign: 'center', marginBottom: 0 }}>
            <Button type="link" onClick={onRegisterClick}>
              Não tem uma conta? Registre-se
            </Button>
          </Form.Item>
        )}
      </Form>
    </Card>
  );
} 