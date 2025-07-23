import { Flex, Typography } from "antd";
import addresses from "@/mock/address";

import { useEffect, useState } from "react";
import Address from "@/models/address/address";
import Card from "@/components/card";
import Title from "antd/es/typography/Title";

interface Props {
  addressID: Number;
}

export default function ComplaintAddress(props: Props) {
  const [address, setAddress] = useState<Address | null>(null);

  useEffect(() => {
    const found = addresses.find(
      (a) => a.id === props.addressID
    ) as unknown as Address | null;
    setAddress(found || null);
  }, [props.addressID]);

  return (
    <Flex vertical>
      <Card>
        <Title level={4}>Endereço</Title>
        {!address ? (
          <Typography.Paragraph>Endereço Não Encontrado</Typography.Paragraph>
        ) : (
          <Flex vertical>
            <Typography.Paragraph>
              {address.street}, nº {address.houseNumber}, {address.neighborhood}
            </Typography.Paragraph>

            <Typography.Paragraph>Cep: {address.zipCode}</Typography.Paragraph>
          </Flex>
        )}
      </Card>
    </Flex>
  );
}
