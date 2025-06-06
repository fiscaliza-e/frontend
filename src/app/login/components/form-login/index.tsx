import React from "react";
import { useRouter } from "next/navigation";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { Button, Checkbox, Form, Input, Flex } from "antd";

import styles from "./form-login.module.css";

export default function LoginForm() {
  const router = useRouter();

  const handleSubmit = () => {
    alert("Login Feito com sucesso!");
    router.push("/");
  };

  const handleForgotPassword = () => {
    router.push("/forgot-password");
  };

  const handleRegister = () => {
    router.push("/register");
  };
  
  return (
    <Flex vertical className={classNames(styles.loginForm, styles.formLayout)}>
      <h1>Entrar</h1>
      <Form
        name="login"
        initialValues={{ remember: true }}
        style={{ minWidth: 360 }}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="username"
          rules={[
            { required: true, message: "Por favor, informe seu usuário!" },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Usuário" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Por favor, informe sua senha!" }]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Senha"
          />
        </Form.Item>
        <Form.Item>
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Lembrar credenciais</Checkbox>
            </Form.Item>
            <a onClick={handleForgotPassword}>Esqueceu a senha</a>
          </Flex>
        </Form.Item>

        <Form.Item>
          <Button
            className={styles.formButton}
            block
            type="primary"
            htmlType="submit"
            color="green"
          >
            Login
          </Button>
          ou <a onClick={handleRegister}>Registre-se no Site</a>
        </Form.Item>
      </Form>
    </Flex>
  );
}
