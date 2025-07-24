import { Flex, Form, Input } from "antd";
import classNames from "classnames";
import { useEffect } from "react";

import styles from "../form-register.module.css";

interface RegisterFormAddressInfoProps {
  form: any;
}

export default function RegisterFormAddressInfo({ form }: RegisterFormAddressInfoProps) {
  const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, "");
    form.setFieldValue("cep", cep);
    if (cep.length === 8) {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await res.json();
        if (!data.erro) {
          form.setFieldsValue({
            street: data.logradouro,
            bairro: data.bairro,
            city: data.localidade,
            uf: data.uf,
          });
        }
      } catch (err) {
      }
    }
  };

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
          <Input onChange={handleCepChange} maxLength={8} />
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
