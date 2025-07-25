import { Flex } from "antd";
import styles from "./styles.module.css";

interface Props {
  onChange: (value: string) => void;
  statuses: string[];
}

export default function ComplaintsFilter({ onChange, statuses }: Props) {
  return (
    <Flex className={styles.filters} align="center" justify="center">
      <Flex className={styles.filterComplaints}>
        {statuses.map((status, index) => (
          <Flex key={status}>
            <input
              key={index}
              id={status}
              name="filters"
              type="radio"
              className={styles.filterRadio}
              value={status}
              defaultChecked={index === 0}
              onChange={(e) => onChange(e.target.value)}
            />
            <label htmlFor={status} className={styles.filterLabel}>
              {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
            </label>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}
