import { Flex } from "antd";
import styles from "./styles.module.css";

import options from "@/mock/filter-options/index";

interface Props {
  onChange: (value: string) => void;
}

export default function ComplaintsFilter({ onChange }: Props) {
  return (
    <Flex vertical justify="center" className={styles.filters}>
      <Flex justify="space-between" className={styles.filterComplaints}>
        {options.map((option, index) => (
          <Flex key={option.id}>
            <input
              key={index}
              id={option.id}
              name="filters"
              type="radio"
              className={styles.filterRadio}
              value={option.id}
              defaultChecked={index === 0}
              onChange={(e) => onChange(e.target.value)}
            />
            <label htmlFor={option.id} className={styles.filterLabel}>
              {option.label}
            </label>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}
