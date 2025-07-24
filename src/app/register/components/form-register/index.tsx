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
      const payload = {
        cpf: values.cpf,
        name: values.name,
        email: values.email,
        birthDate: values.birth_date,
        password: values.password,
        confirmPassword: values.password,
        role_id: 1, 
        address: {
          street: values.street,
          number: values.number,
          neighborhood: values.bairro,
          city: values.city,
          state: values.uf,
          zipCode: values.cep,
        },
      };
      await register(payload);
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
        <RegisterFormAddressInfo form={form} />
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
