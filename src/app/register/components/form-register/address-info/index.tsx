import { Flex, Form, Input } from "antd";
import classNames from "classnames";

import styles from "../form-register.module.css";

export default function RegisterFormAddressInfo() {
  return (
    <Flex vertical className={styles.formSection}>
      <p> Endereço </p>
      <Flex wrap className={styles.addressInput} justify="space-around">
        <Form.Item
          className={classNames(styles.formItem, styles.cepInput)}
          label="CEP"
          name="cep"
          rules={[{ required: true, message: "Informe o CEP" }]}
        >
          <Input onChange={() => {}} />
        </Form.Item>

        <Form.Item
          className={classNames(styles.formItem, styles.numberInput)}
          label="Nº"
          name="number"
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
          className={classNames(styles.formItem, styles.streetInput)}
          label="Rua"
          name="street"
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
