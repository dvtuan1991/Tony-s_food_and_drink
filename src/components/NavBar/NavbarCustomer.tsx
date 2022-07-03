import Menu from "antd/lib/menu";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import { Link } from "react-router-dom";

const NavbarCustomer = () => {
  const items: ItemType[] = [
    { label: <Link to={"/"}>Home</Link>, key: "home" },
    { label: <Link to={"/order"}>Order</Link>, key: "order" }
  ];
  return <Menu items={items} mode="horizontal" className="border-0" />;
};

export default NavbarCustomer;
