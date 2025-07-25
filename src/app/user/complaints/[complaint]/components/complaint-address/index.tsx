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
}

export default function ComplaintAddress({ address }: Props) {
  return (
    <Flex vertical className="addressContainer">
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
            <Typography.Paragraph>Cep: {address.zipCode}</Typography.Paragraph>
            {address.complement && (
              <Typography.Paragraph>Complemento: {address.complement}</Typography.Paragraph>
            )}
          </Flex>
        )}
      </Card>
    </Flex>
  );
}
