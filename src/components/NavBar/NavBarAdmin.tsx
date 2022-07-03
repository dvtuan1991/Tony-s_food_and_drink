import Menu from "antd/lib/menu";
import { Link } from "react-router-dom";
import { ItemType } from "antd/lib/menu/hooks/useItems";

import styles from "./navbar.module.css";

const NavBarAdmin = () => {
  const items: ItemType[] = [
    { label: <Link to={"/admin"}>Home</Link>, key: "home" },
    { label: <Link to={"/admin/category"}>Category</Link>, key: "category" },
    { label: <Link to={"/admin/product"}>Product</Link>, key: "product" },
    { label: <Link to={"/admin/order"}>Order</Link>, key: "order" }
  ];
  return (
    <div className={styles["navbar-admin"]}>
      <Menu
        items={items}
        mode="vertical"
        theme="dark"
        className="p-5 w-full h-full"
      />
    </div>
  );
};

export default NavBarAdmin;
