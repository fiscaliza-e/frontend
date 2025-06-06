import React from "react";

import { Button, Flex, Form } from "antd";
import { useForm } from "antd/es/form/Form";

import styles from "./form-register.module.css";
import RegisterFormAddressInfo from "./address-info";
import RegisterFormPersonalInfo from "./personal-info";
import RegisterFormAuthInfo from "./auth-info";
import classNames from "classnames";
import Card from "@/components/test-card";

export default function FormRegister() {
  const [form] = useForm();
  return (
    <Card title="Register">
      <Form form={form} initialValues={{ variant: "filled" }} layout="vertical">
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
          >
            Cadastrar
          </Button>
        </Flex>
      </Form>
    </Card>
  );
}
