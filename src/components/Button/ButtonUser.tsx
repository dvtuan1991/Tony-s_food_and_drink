import Avatar from "antd/lib/avatar/avatar";
import { FC } from "react";

import { IUser } from "types/User";

import styles from "./Button.module.css";

const ButtonUser: FC<{user: IUser}>  = ({user}) => {
  return (
    <div className={styles.wrapIcon}>
      <Avatar src="https://vietnamtravel.com/images/2020/05/banh-khot.jpg.webp" />
      <div className={styles.user}>{""}</div>
    </div>
  );
};

export default ButtonUser;
