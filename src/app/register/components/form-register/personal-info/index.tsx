import { Flex, Form, Input } from "antd";

import styles from "../form-register.module.css";

export default function RegisterFormPersonalInfo() {
  return (
    <Flex vertical className={styles.formSection}>
      <p> Dados pessoais </p>
      <Flex justify="space-around" wrap>
        <Form.Item
          className={styles.formItem}
          style={{ width: 445 }}
          label="Nome Completo"
          name="name"
          rules={[
            { required: true, message: "O nome é obrigatório" },
            {
              max: 50,
              message: "O nome não pode possuir mais que 50 caracteres",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className={styles.formItem}
          label="CPF"
          name="cpf"
          rules={[{ required: true, message: "O CPF é obrigatório!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className={styles.formItem}
          label="Data de Nascimento"
          name="birth_date"
          rules={[{ required: true, message: "A data de nascimento é obrigatória!" }]}
        >
          <Input type="date" />
        </Form.Item>
      </Flex>
    </Flex>
  );
}
