import Avatar from "antd/lib/avatar/avatar";

import styles from "./Button.module.css";

const ButtonUser = () => {
  return (
    <div className={styles.wrapIcon}>
      <Avatar src="https://vietnamtravel.com/images/2020/05/banh-khot.jpg.webp" />
      <div className={styles.user}></div>
    </div>
  );
};

export default ButtonUser;
