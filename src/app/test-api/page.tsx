'use client';

import React, { useEffect } from 'react';
import { Card, Button, List, Tag, Spin, Alert, Space, Typography } from 'antd';
import { ReloadOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useUsers } from '../../hooks/use-users';
import { apiClient } from '../../lib/api-client';

const { Title, Text } = Typography;

export default function TestApiPage() {
  const { users, isLoading, error, fetchUsers } = useUsers();
  const [connectionStatus, setConnectionStatus] = React.useState<'checking' | 'connected' | 'error'>('checking');
  const [connectionError, setConnectionError] = React.useState<string>('');

  const testConnection = async () => {
    setConnectionStatus('checking');
    setConnectionError('');
    
    try {
      await apiClient.get('/health');
      setConnectionStatus('connected');
    } catch (error: any) {
      setConnectionStatus('error');
      setConnectionError(error.message || 'Erro ao conectar com o backend');
    }
  };

  useEffect(() => {
    testConnection();
  }, []);

  const getStatusIcon = () => {
    switch (connectionStatus) {
      case 'connected':
        return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
      case 'error':
        return <CloseCircleOutlined style={{ color: '#ff4d4f' }} />;
      default:
        return <Spin size="small" />;
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'Conectado';
      case 'error':
        return 'Erro de Conexão';
      default:
        return 'Verificando...';
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 800, margin: '0 auto' }}>
      <Title level={2}>Teste de Conectividade com Backend</Title>
      
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Card title="Status da Conexão">
          <Space>
            {getStatusIcon()}
            <Text strong>{getStatusText()}</Text>
            <Button 
              icon={<ReloadOutlined />} 
              onClick={testConnection}
              loading={connectionStatus === 'checking'}
            >
              Testar Conexão
            </Button>
          </Space>
          
          {connectionStatus === 'error' && (
            <Alert
              message="Erro de Conexão"
              description={connectionError}
              type="error"
              showIcon
              style={{ marginTop: 16 }}
            />
          )}
          
          {connectionStatus === 'connected' && (
            <Alert
              message="Conexão Estabelecida"
              description="Backend está respondendo corretamente"
              type="success"
              showIcon
              style={{ marginTop: 16 }}
            />
          )}
        </Card>

        <Card 
          title="Teste do Endpoint /users" 
          extra={
            <Button 
              type="primary" 
              onClick={fetchUsers}
              loading={isLoading}
              disabled={connectionStatus !== 'connected'}
            >
              Buscar Usuários
            </Button>
          }
        >
          {error && (
            <Alert
              message="Erro ao buscar usuários"
              description={error}
              type="error"
              showIcon
              style={{ marginBottom: 16 }}
            />
          )}

          {isLoading ? (
            <div style={{ textAlign: 'center', padding: 40 }}>
              <Spin size="large" />
              <div style={{ marginTop: 16 }}>Carregando usuários...</div>
            </div>
          ) : users.length > 0 ? (
            <List
              dataSource={users}
              renderItem={(user) => (
                <List.Item>
                  <List.Item.Meta
                    title={user.name}
                    description={
                      <Space direction="vertical" size="small">
                        <Text type="secondary">Email: {user.email}</Text>
                        <Text type="secondary">CPF: {user.cpf}</Text>
                        <Text type="secondary">
                          Criado em: {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                        </Text>
                      </Space>
                    }
                  />
                  <Tag color="blue">ID: {user.id}</Tag>
                </List.Item>
              )}
            />
          ) : (
            <div style={{ textAlign: 'center', padding: 40, color: '#999' }}>
              Nenhum usuário encontrado. Clique em "Buscar Usuários" para testar.
            </div>
          )}
        </Card>

        <Card title="Informações da API">
          <Space direction="vertical" size="small">
            <Text><strong>URL Base:</strong> {process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}</Text>
            <Text><strong>Endpoint Testado:</strong> /users</Text>
            <Text><strong>Método:</strong> GET</Text>
            <Text><strong>Status da Conexão:</strong> {getStatusText()}</Text>
          </Space>
        </Card>
      </Space>
    </div>
  );
} 