"use client";
import { Flex, Typography } from "antd";
import Card from "@/components/card";
import Title from "antd/es/typography/Title";
import "./styles.module.css";

interface Address {
  id: number;
  street: string;
  number: string | number;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string | number;
}

interface Props {
  address?: Address | null;
  description?: string;
}

export default function ComplaintAddress({ address, description }: Props) {
  const cep = address?.zipCode || (address as any)?.zip_code || '';
  return (
    <Flex vertical>
      <Card>
        <Title level={4}>Endereço</Title>
        {!address ? (
          <Typography.Paragraph>Endereço Não Encontrado</Typography.Paragraph>
        ) : (
          <Flex vertical>
            <Typography.Paragraph>
              {address.street}, nº {address.number}, {address.neighborhood}
            </Typography.Paragraph>
            <Typography.Paragraph>
              {address.city} - {address.state}
            </Typography.Paragraph>
            <Typography.Paragraph>CEP: {cep}</Typography.Paragraph>
            {address.complement && (
              <Typography.Paragraph>Complemento: {address.complement}</Typography.Paragraph>
            )}
          </Flex>
        )}
        <Flex vertical>
          <Title level={4}>Descrição</Title>
          <Typography.Paragraph>{description}</Typography.Paragraph>
        </Flex>
      </Card>
    </Flex>
  );
}
