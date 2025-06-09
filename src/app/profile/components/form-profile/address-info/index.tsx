import { Flex, Form, Input } from "antd";
import classNames from "classnames";

import styles from "../form-profile.module.css";

export default function ProfileFormAddressInfo() {
  return (
    <Flex vertical className={styles.formSection}>
      <p> Endereço </p>
      <Flex wrap className={styles.addressInput} justify="space-around">
        <Form.Item
          className={classNames(styles.formItem, styles.cepInput)}
          label="CEP"
          name="cep"
        >
          <Input onChange={() => {}} />
        </Form.Item>

        <Form.Item
          className={classNames(styles.formItem, styles.numberInput)}
          label="Nº"
          name="number"
        >
          <Input />
        </Form.Item>

        <Form.Item
          className={classNames(styles.formItem, styles.streetInput)}
          label="Rua"
          name="street"
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          className={styles.formItem}
          label="Bairro"
          name="bairro"
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          className={styles.formItem}
          label="Cidade"
          name="city"
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          className={styles.formItem}
          label="UF"
          name="uf"
        >
          <Input disabled />
        </Form.Item>
      </Flex>
    </Flex>
  );
}
