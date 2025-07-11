import React from "react";
import { Button, Flex, Form, message } from "antd";
import { useForm } from "antd/es/form/Form";
import styles from "./form-register.module.css";
import RegisterFormAddressInfo from "./address-info";
import RegisterFormPersonalInfo from "./personal-info";
import RegisterFormAuthInfo from "./auth-info";
import classNames from "classnames";
import Card from "@/components/card";
import { useAuth } from "@/hooks/use-auth";

export default function FormRegister() {
  const [form] = useForm();
  const { register, isLoading } = useAuth();

  const handleSubmit = async (values: any) => {
    try {
      await register(values);
      message.success("Cadastro realizado com sucesso!");
      form.resetFields();
    } catch (error: any) {
      message.error(error.message || "Erro ao cadastrar usuário");
    }
  };

  return (
    <Card title="Cadastro">
      <Form
        form={form}
        initialValues={{ variant: "filled" }}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <RegisterFormPersonalInfo />
        <RegisterFormAddressInfo />
        <RegisterFormAuthInfo />
        <Flex justify="center">
          <Button
            className={classNames(
              styles.submitButton,
              styles.hoverButton,
              styles.defaultButton
            )}
            type="primary"
            htmlType="submit"
            loading={isLoading}
          >
            Cadastrar
          </Button>
        </Flex>
      </Form>
    </Card>
  );
}
