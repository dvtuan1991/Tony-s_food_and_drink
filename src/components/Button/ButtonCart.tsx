import { Badge } from "antd";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { RootState } from "store";
import { ShoppingCartOutlined } from "@ant-design/icons";
import styles from "./Button.module.css";

const ButtonCart = () => {
  const { total } = useSelector((state: RootState) => state.carts);
  return (
    <div className={styles.wrapIcon}>
      <NavLink to="/cart">
        <Badge count={total} showZero>
          <ShoppingCartOutlined style={{ fontSize: "1.5rem" }} />
        </Badge>
      </NavLink>
    </div>
  );
};

export default ButtonCart;
