import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex, message } from "antd";
import styles from "./form-login.module.css";
import Card from "@/components/card";
import { useAuth } from "@/hooks/use-auth";

export default function LoginForm() {
  const router = useRouter();
  const { login, isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    console.log("[LoginForm] isAuthenticated:", isAuthenticated);
    if (isAuthenticated) {
      console.log("[LoginForm] Redirecionando para home...");
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (values: any) => {
    console.log("[LoginForm] Submetendo login com valores:", values);
    try {
      await login({ email: values.email, password: values.password });
      router.push("/");
      console.log("[LoginForm] Login realizado com sucesso!");
      message.success("Login feito com sucesso!");
    } catch (error: any) {
      console.log("[LoginForm] Erro ao fazer login:", error);
      message.error(error.message || "Erro ao fazer login");
    }
  };

  const handleForgotPassword = () => {
    console.log("[LoginForm] Navegando para /forgot-password");
    router.push("/forgot-password");
  };

  const handleRegister = () => {
    console.log("[LoginForm] Navegando para /register");
    router.push("/register");
  };

  return (
    <Card title="Login" titleClassName={styles.loginTitle}>
      <Form
        name="login"
        initialValues={{ remember: true }}
        style={{ minWidth: 360 }}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Por favor, informe seu e-mail!" },
            { type: "email", message: "Por favor, informe um e-mail válido!" },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="E-mail" type="email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Por favor, informe sua senha!" }]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Senha" />
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
            loading={isLoading}
          >
            Login
          </Button>
          ou <a onClick={handleRegister}>Registre-se no Site</a>
        </Form.Item>
      </Form>
    </Card>
  );
}
