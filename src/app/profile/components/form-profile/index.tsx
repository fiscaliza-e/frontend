import React from "react";

import { Button, Form, Flex } from "antd";
import { useForm } from "antd/es/form/Form";

import styles from "./form-profile.module.css";
import ProfileFormAddressInfo from "./address-info";
import Card from "@/components/card";
import classNames from "classnames";
import ProfileFormAuthInfo from "./auth-info";
import ProfileFormHeaderInfo from "./profile-header";

export default function FormProfile() {
  const [form] = useForm();

  return (
    <Card title="Edição de Perfil">
      <Form form={form} initialValues={{ variant: "filled" }} layout="vertical">
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
            type="primary"
            htmlType="reset"
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
          >
            Editar
          </Button>
        </Flex>
      </Form>
    </Card>
  );
}
