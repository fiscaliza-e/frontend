import { Flex, Form, Input } from "antd";

import styles from "../form-profile.module.css";

export default function ProfileFormAuthInfo() {
  return (
    <Flex vertical className={styles.formSection}>
      <p> Dados de autenticação </p>
      <Flex>
        <Form.Item
          className={styles.formItem}
          label="Email atual"
          name="email"
        >
          <Input />
        </Form.Item>

        <Form.Item
          className={styles.formItem}
          label="Novo email"
          name="new email"
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          className={styles.formItem}
          label="Senha"
          name="confirm-password"
          rules={[{ required: true, message: "A senha deve ser a mesma registrada no cadastro!" }]}
        >
          <Input.Password />
        </Form.Item>
      </Flex>
    </Flex>
  );
}
