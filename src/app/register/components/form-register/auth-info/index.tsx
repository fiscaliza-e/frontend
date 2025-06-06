import { Flex, Form, Input } from "antd";

import styles from "../form-register.module.css";

export default function RegisterFormAuthInfo() {
  return (
    <Flex vertical className={styles.formSection}>
      <p> Dados de autenticação </p>
      <Flex justify="space-around" wrap>
        <Form.Item
          className={styles.formItem}
          label="Email"
          name="email"
          rules={[{ required: true, message: "Informe um email!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className={styles.formItem}
          label="Senha"
          name="password"
          rules={[{ required: true, message: "Digite sua senha" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          className={styles.formItem}
          label="Confirmar Senha"
          name="confirm-password"
          rules={[{ required: true, message: "As senhas devem ser iguais" }]}
        >
          <Input.Password />
        </Form.Item>
      </Flex>
    </Flex>
  );
}
