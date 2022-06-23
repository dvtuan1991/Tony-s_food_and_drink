import { Badge } from "antd";
import { useSelector } from "react-redux";

import { RootState } from "store";
import { ShoppingCartOutlined } from "@ant-design/icons";
import styles from "./Button.module.css";

const ButtonCart = () => {
  const { total } = useSelector((state: RootState) => state.carts);
  return (
    <div className={styles.wrapIcon}>
      <Badge count={total} showZero>
        <ShoppingCartOutlined style={{ fontSize: "1.5rem" }} />
      </Badge>
      <div className={styles.cartList}>test</div>
    </div>
  );
};

export default ButtonCart;
