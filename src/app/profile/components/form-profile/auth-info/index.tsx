import { Flex, Form, Input } from "antd";

import styles from "../form-profile.module.css";

export default function ProfileFormAuthInfo() {
  return (
    <Flex vertical className={styles.formSection}>
      <p> Dados de autenticação </p>
      <Flex>
        <Form.Item
          className={styles.formItem}
          label="Email"
          name="email"
        >
          <Input />
        </Form.Item>
      </Flex>
    </Flex>
  );
}
