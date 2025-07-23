import { Flex, Form, Input } from "antd";
import classNames from "classnames";

import styles from "../form-profile.module.css";

interface ProfileFormAddressInfoProps {
  isEditing: boolean;
}

export default function ProfileFormAddressInfo({ isEditing }: ProfileFormAddressInfoProps) {
  return (
    <Flex vertical className={styles.formSection}>
      <p> Endereço </p>
      <Flex wrap className={styles.addressInput} justify="space-around">
        <Form.Item
          className={classNames(styles.formItem, styles.cepInput)}
          label="CEP"
          name="zipCode"
        >
          <Input disabled={!isEditing} />
        </Form.Item>

        <Form.Item
          className={classNames(styles.formItem, styles.numberInput)}
          label="Nº"
          name="number"
        >
          <Input disabled={!isEditing} />
        </Form.Item>

        <Form.Item
          className={classNames(styles.formItem, styles.streetInput)}
          label="Rua"
          name="street"
        >
          <Input disabled={!isEditing} />
        </Form.Item>

        <Form.Item
          className={styles.formItem}
          label="Bairro"
          name="neighborhood"
        >
          <Input disabled={!isEditing} />
        </Form.Item>

        <Form.Item
          className={styles.formItem}
          label="Cidade"
          name="city"
        >
          <Input disabled={!isEditing} />
        </Form.Item>

        <Form.Item
          className={styles.formItem}
          label="UF"
          name="state"
        >
          <Input disabled={!isEditing} />
        </Form.Item>
      </Flex>
    </Flex>
  );
}
