import { Flex, Avatar, Typography, Form, Input, DatePicker } from "antd";
import styles from "../form-profile.module.css";
import { UserOutlined } from "@ant-design/icons";
import { useAuth } from "@/hooks/use-auth";
import dayjs from "dayjs";

const { Text } = Typography;

interface ProfileFormHeaderInfoProps {
  isEditing: boolean;
}

export default function ProfileFormHeaderInfo({ isEditing }: ProfileFormHeaderInfoProps) {
    const { user } = useAuth();

    return (
        <Flex vertical className={styles.formSection}>
            <Flex align="center" gap={16} style={{ marginBottom: '20px' }}>
                <Avatar size={86} icon={<UserOutlined />} />
                <Flex vertical>
                    <Text strong>{user?.name || 'Usuário'}</Text>
                    <Text type="secondary">{user?.cpf || 'CPF não informado'}</Text>
                </Flex>
            </Flex>

            <Flex wrap gap={16}>
                <Form.Item
                    className={styles.formItem}
                    label="Nome Completo"
                    name="name"
                    rules={[{ required: true, message: 'Por favor, insira seu nome' }]}
                >
                    <Input disabled={!isEditing} />
                </Form.Item>

                <Form.Item
                    className={styles.formItem}
                    label="CPF"
                    name="cpf"
                >
                    <Input disabled />
                </Form.Item>

                <Form.Item
                    className={styles.formItem}
                    label="Data de Nascimento"
                    name="birthDate"
                    rules={[{ required: true, message: 'Por favor, insira sua data de nascimento' }]}
                >
                    <DatePicker 
                        style={{ width: '100%' }}
                        format="DD/MM/YYYY"
                        placeholder="Selecione a data"
                        disabled={!isEditing}
                    />
                </Form.Item>
            </Flex>
        </Flex>
    );
}

