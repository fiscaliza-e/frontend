import React, { useEffect } from "react";
import { Button, Form, Flex, message } from "antd";
import { useForm } from "antd/es/form/Form";
import styles from "./form-profile.module.css";
import ProfileFormAddressInfo from "./address-info";
import Card from "@/components/card";
import classNames from "classnames";
import ProfileFormAuthInfo from "./auth-info";
import ProfileFormHeaderInfo from "./profile-header";
import { useAuth } from "@/hooks/use-auth";

export default function FormProfile() {
  const [form] = useForm();
  const { user, updateProfile, isLoading } = useAuth();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user.name,
        email: user.email,
        cpf: user.cpf,
      });
    }
  }, [user, form]);

  const handleSubmit = async (values: any) => {
    try {
      await updateProfile(values);
      message.success("Perfil atualizado com sucesso!");
    } catch (error: any) {
      message.error(error.message || "Erro ao atualizar perfil");
    }
  };

  const handleCancel = () => {
    if (user) {
      form.setFieldsValue({
        name: user.name,
        email: user.email,
        cpf: user.cpf,
      });
    }
  };

  return (
    <Card title="Edição de Perfil">
      <Form
        form={form}
        initialValues={{ variant: "filled" }}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <ProfileFormHeaderInfo />
        <ProfileFormAddressInfo />
        <ProfileFormAuthInfo />
        <Flex justify="center">
          <Button
            className={classNames(
              styles.cancelButton,
              styles.hoverButton,
              styles.defaultButton
            )}
            type="default"
            htmlType="button"
            onClick={handleCancel}
            disabled={isLoading}
          >
            Cancelar
          </Button>
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
            Editar
          </Button>
        </Flex>
      </Form>
    </Card>
  );
}
