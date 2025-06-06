"use client";
import { Button, Form, Input, Flex } from "antd";

import styles from "./forgot-password.module.css";
import Card from "@/components/card";
import classNames from "classnames";

export default function ForgotPassword() {
  return (
    <Card title="Redefinir Senha">
      <Form
        name="forgotPassword"
        initialValues={{ remember: true }}
        className={styles.cardDescription}
        onFinish={() => {}}
      >
        <Flex vertical style={{ minWidth: 360 }}>
          <p>
            Para recuperar sua senha, insira o e-mail informado ao se cadastrar.
          </p>
        </Flex>

        <Form.Item
          name="email"
          className={styles.emailInput}
          rules={[
            { required: true, message: "Por favor, informe um email valido!" },
          ]}
        >
          <Input placeholder="email@example.com" />
        </Form.Item>
        <Flex justify="center">
          <Button
            className={classNames(styles.submitButton, styles.hoverButton)}
            type="primary"
            htmlType="submit"
          >
            Enviar
          </Button>
        </Flex>
      </Form>
    </Card>
  );
}
