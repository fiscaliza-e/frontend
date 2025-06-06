import { Flex, Form, Input } from "antd";

import styles from "../form-register.module.css";

export default function AddressInfo() {
  return (
    <Flex vertical className={styles.formSection}>
      <p> Endereço </p>
      <Flex
        style={{ flexWrap: "wrap", maxWidth: "100%" }}
        justify="space-around"
      >
        <Form.Item
          className={styles.formItem}
          label="CEP"
          name="cep"
          style={{ maxWidth: "70px" }}
          rules={[{ required: true, message: "Informe o CEP" }]}
        >
          <Input onChange={() => {}} />
        </Form.Item>

        <Form.Item
          className={styles.formItem}
          label="Nº"
          name="number"
          style={{ maxWidth: "70px" }}
          rules={[
            {
              required: true,
              message: "O número da casa é obrigatório",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className={styles.formItem}
          style={{ minWidth: "400px" }}
          label="Rua"
          name="rua"
          rules={[{ required: true, message: "Rua não encontrada" }]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          className={styles.formItem}
          label="Bairro"
          name="bairro"
          rules={[{ required: true, message: "Bairro não encontrado" }]}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          className={styles.formItem}
          label="Cidade"
          name="city"
          rules={[
            {
              required: true,
              message: "Cidade não encontrada",
            },
          ]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item
          className={styles.formItem}
          label="UF"
          name="uf"
          rules={[
            {
              required: true,
              message: "UF não encontrada",
            },
          ]}
        >
          <Input disabled />
        </Form.Item>
      </Flex>
    </Flex>
  );
}
