import React, { useEffect, useState } from "react";
import { Button, Form, Flex, message } from "antd";
import { useForm } from "antd/es/form/Form";
import styles from "./form-profile.module.css";
import ProfileFormAddressInfo from "./address-info";
import Card from "@/components/card";
import classNames from "classnames";
import ProfileFormAuthInfo from "./auth-info";
import ProfileFormHeaderInfo from "./profile-header";
import { useAuth } from "@/hooks/use-auth";
import { userService } from "@/services/user-service";
import dayjs from "dayjs";

export default function FormProfile() {
  const [form] = useForm();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [updatedUser, setUpdatdUser] = useState(user)

  useEffect(() => {
    if (updatedUser) {
      form.setFieldsValue({
        name: updatedUser.name,
        email: updatedUser.email,
        cpf: updatedUser.cpf,
        birthDate: updatedUser.birth_date ? dayjs(updatedUser.birth_date) : null,
        street: updatedUser.addresses?.street,
        number: updatedUser.addresses?.number,
        neighborhood: updatedUser.addresses?.neighborhood,
        city: updatedUser.addresses?.city,
        state: updatedUser.addresses?.state,
        zipCode: updatedUser.addresses?.zip_code,
      });
    }
  }, [updatedUser, form]);

  const handleSubmit = async (values: any) => {
    if (!updatedUser) return;
    
    setIsSubmitting(true);
    try {
      const updateData: any = {
        name: values.name,
        email: values.email,
        birth_date: values.birthDate ? values.birthDate.format('YYYY-MM-DD') : updatedUser.birth_date,
        address: {
          id: updatedUser.addresses?.id || 0,
          street: values.street,
          number: parseInt(values.number) || 0,
          neighborhood: values.neighborhood,
          city: values.city,
          state: values.state,
          zip_code: parseInt(String(values.zipCode || '').replace(/\D/g, '')) || 0,
        }
      };

      console.log('🎯 FormProfile - Dados a serem enviados:', JSON.stringify(updateData, null, 2));

      const response = await userService.updateProfile(updateData);
      console.log('✅ FormProfile - Usuário atualizado retornado:', JSON.stringify(response, null, 2));
      
      setUpdatdUser(response)
      message.success("Perfil atualizado com sucesso!");
      setIsEditing(false);
    } catch (error: any) {
      console.error('Erro ao atualizar perfil:', error);
      message.error(error.message || "Erro ao atualizar perfil");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      form.setFieldsValue({
        name: user.name,
        email: user.email,
        cpf: user.cpf,
        birthDate: user.birth_date ? dayjs(user.birth_date) : null,
        street: user.addresses?.street,
        number: user.addresses?.number,
        neighborhood: user.addresses?.neighborhood,
        city: user.addresses?.city,
        state: user.addresses?.state,
        zipCode: user.addresses?.zip_code,
      });
    }
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  if (!user) {
    return (
      <Card title="Edição de Perfil">
        <div style={{ textAlign: 'center', padding: '20px' }}>
          Carregando dados do usuário...
        </div>
      </Card>
    );
  }

  return (
    <Card title="Edição de Perfil">
      <Form
        form={form}
        initialValues={{ variant: "filled" }}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <ProfileFormHeaderInfo isEditing={isEditing} />
        <ProfileFormAddressInfo isEditing={isEditing} />
        <ProfileFormAuthInfo isEditing={isEditing} />
        <Flex justify="center" gap={16}>
          {isEditing ? (
            <>
              <Button
                className={classNames(
                  styles.cancelButton,
                  styles.hoverButton,
                  styles.defaultButton
                )}
                type="default"
                htmlType="button"
                onClick={handleCancel}
                disabled={isSubmitting}
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
                loading={isSubmitting}
              >
                Salvar
              </Button>
            </>
          ) : (
            <Button
              className={classNames(
                styles.submitButton,
                styles.hoverButton,
                styles.defaultButton
              )}
              type="primary"
              htmlType="button"
              onClick={handleEdit}
            >
              Editar
            </Button>
          )}
        </Flex>
      </Form>
    </Card>
  );
}
