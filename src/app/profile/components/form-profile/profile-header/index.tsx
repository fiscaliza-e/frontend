import { Flex, Avatar, Typography } from "antd";
import styles from "../form-profile.module.css";
import { UserOutlined } from "@ant-design/icons"; 

const { Text } = Typography; 

export default function ProfileFormHeaderInfo() {
    return (
        <Flex className={styles.formSection} align="center" gap={16}>  
            <Avatar size={86} icon={<UserOutlined />} /> 
            <Flex vertical> 
                <Text strong editable>Fulano de Tal da Silva</Text> 
                <Text type="secondary">123.456.789-10</Text> 
            </Flex>  
        </Flex> 
    )
}

