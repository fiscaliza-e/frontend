import React from "react";

import { Button, Flex, Form } from "antd";
import { useForm } from "antd/es/form/Form";

import styles from "./form-register.module.css";
import RegisterFormAddressInfo from "./address-info";
import RegisterFormPersonalInfo from "./personal-info";
import RegisterFormAuthInfo from "./auth-info";
import classNames from "classnames";

export default function FormRegister() {
  const [form] = useForm();
  return (
    <Flex justify="center" align="center" className={styles.formContainer}>
      <Form
        form={form}
        className={styles.formLayout}
        initialValues={{ variant: "filled" }}
        layout="vertical"
      >
        <h3 className={styles.formTitle}>Informe seus dados</h3>
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
    </Flex>
  );
}
