import React from "react";

import { Button, Flex, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";

import styles from "./form-register.module.css";
import AddressInfo from "./address-info";
import PersonalInfo from "./personal-info";
import AuthInfo from "./auth-info";

export default function FormRegister() {
  const [form] = useForm();
  return (
    <Flex justify="center" align="center" style={{ maxWidth: "80vw" }}>
      <Form
        form={form}
        className={styles.formLayout}
        initialValues={{ variant: "filled" }}
        layout="vertical"
      >
        <h3 className={styles.formTitle}>Informe seus dados</h3>
        <PersonalInfo />
        <AddressInfo />
        <AuthInfo />
        <Form.Item
          style={{ display: "flex", justifyContent: "center", width: "100%" }}
        >
          <Button
            className={[
              styles.submitButton,
              styles.hoverButton,
              styles.defaultButton,
            ].join(" ")}
            type="primary"
            htmlType="submit"
          >
            Cadastrar
          </Button>
        </Form.Item>
      </Form>
    </Flex>
  );
}
