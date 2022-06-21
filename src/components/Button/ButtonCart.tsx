import { Badge } from "antd";
import React from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import styles from "./Button.module.css";

const ButtonCart = () => {
  return (
    <div className={styles.wrapIcon}>
      <Badge count={0} showZero>
        <ShoppingCartOutlined style={{ fontSize: "1.5rem" }} />
      </Badge>
      <div className={styles.cartList}></div>
    </div>
  );
};

export default ButtonCart;
