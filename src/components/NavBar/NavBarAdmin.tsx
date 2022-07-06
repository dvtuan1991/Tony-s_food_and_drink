import Button from "antd/lib/button";
import Row from "antd/lib/row";
import Col from "antd/lib/col";
import LogoutOutlined from "@ant-design/icons/LogoutOutlined";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { addUser } from "store/user.slice";
import { clearCart } from "store/cart.slice";
import { IUser } from "types/user.model";
import { openNotification } from "helpers/function";
import styles from "./navbar.module.css";

const NavBarAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClickLogout = () => {
    dispatch(addUser({} as IUser));
    dispatch(clearCart());
    openNotification("info", "You're Log Out");
    navigate("/");
  };

  return (
    <div className={styles["navbar-admin"]}>
      <nav>
        <ul>
          <li>
            <NavLink to={"/admin"}>Home</NavLink>
          </li>
          <li>
            <NavLink to={"/admin/category"}>Category</NavLink>
          </li>
          <li>
            <NavLink to={"/admin/product"}>Product</NavLink>
          </li>
          <li>
            <NavLink to={"/admin/order"}>Order</NavLink>
          </li>
          <li>
            <Link to="/">Go to app</Link>
          </li>
          <li className="sm:ml-auto lg:ml-0  lg:mt-auto lg:mb-11">
            <Button
              type="link"
              shape="circle"
              onClick={handleClickLogout}
              icon={<LogoutOutlined />}
              className="text-red-700 hover:text-red-700"
            />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBarAdmin;
