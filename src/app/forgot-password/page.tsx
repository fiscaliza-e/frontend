"use client";
import { UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex } from "antd";

import styles from "./forgot-password.module.css";

export default function ForgotPassword() {
  return (
    <Form
      className={styles.formLayout}
      name="forgotPassword"
      initialValues={{ remember: true }}
      style={{ minWidth: 300 }}
      onFinish={() => {}}
    >
      <Flex vertical style={{ minWidth: 360 }}>
        <h3 className={styles.formTitle}>Redefinir Senha</h3>
        <p>
          Para recuperar sua senha, insira o e-mail informado ao se cadastrar.
        </p>
      </Flex>

      <Form.Item
        name="email"
        style={{ margin: "1rem 0" }}
        rules={[
          { required: true, message: "Por favor, informe um email valido!" },
        ]}
      >
        <Input prefix={""} placeholder="email@example.com" />
      </Form.Item>
      <Flex justify="center">
        <Button
          className={[styles.submitButton, styles.hoverButton].join(" ")}
          type="primary"
          htmlType="submit"
        >
          Enviar
        </Button>
      </Flex>
    </Form>
  );
}
