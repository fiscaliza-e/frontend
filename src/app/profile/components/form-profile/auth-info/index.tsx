import { Flex, Form, Input } from "antd";

import styles from "../form-profile.module.css";

interface ProfileFormAuthInfoProps {
  isEditing: boolean;
}

export default function ProfileFormAuthInfo({ isEditing }: ProfileFormAuthInfoProps) {
  return (
    <Flex vertical className={styles.formSection}>
      <p> Dados de autenticação </p>
      <Flex>
        <Form.Item
          className={styles.formItem}
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Por favor, insira seu email' },
            { type: 'email', message: 'Por favor, insira um email válido' }
          ]}
        >
          <Input disabled={!isEditing} />
        </Form.Item>
      </Flex>
    </Flex>
  );
}
