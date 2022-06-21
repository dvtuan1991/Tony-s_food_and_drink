import Typography from "antd/lib/typography";
import Avatar from "antd/lib/avatar/avatar";
import UserOutlined from "@ant-design/icons/UserOutlined";
import { useSelector } from "react-redux";

import { RootState } from "store";
import { SERVICE_API } from "constants/configs";
import styles from "./Button.module.css";

const { Text } = Typography;
const ButtonUser = () => {
  const { user } = useSelector((state: RootState) => state.users);
  return (
    <div className={styles.wrapIcon}>
      {user?.userName && user.avatar && (
        <Avatar src={`${SERVICE_API}/${user.avatar}`} />
      )}
      {user.userName && !user.avatar && <Avatar>{user.name}</Avatar>}
      {!user.userName && <Avatar icon={<UserOutlined />} />}
      <div className={styles.user}>{""}</div>
    </div>
  );
};

export default ButtonUser;
