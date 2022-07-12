import Menu from "antd/lib/menu";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import {  NavLink, useLocation } from "react-router-dom";

const NavbarCustomer = () => {
  const location = useLocation();
  const pathName = location?.pathname.split("/").filter((i) => i);
  const items: ItemType[] = [
    {
      label: (
        <NavLink
          to={"/"}
          className={(isActive) => (isActive ? "text-orange-600" : "")}
        >
          Home
        </NavLink>
      ),
      key: "home"
    },
    {
      label: (
        <NavLink
          to={"/order"}
          className={(isActive) =>
            isActive ? "text-orange-600 active:text-white" : ""
          }
        >
          Order
        </NavLink>
      ),
      key: "order"
    }
  ];
  return (
    <Menu
      items={items}
      mode="horizontal"
      className="border-0"
      defaultSelectedKeys={[pathName[0]]}
    />
  );
};

export default NavbarCustomer;
