import Button from "antd/lib/button";
import LogoutOutlined from "@ant-design/icons/LogoutOutlined";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { addUser } from "store/user.slice";
import { clearCart } from "store/cart.slice";
import { IUser } from "types/user.model";
import { openNotification } from "helpers/function";
import styles from "components/NavBar/navbar.module.css";
import Popconfirm from "antd/lib/popconfirm";

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
          <li className="sm:ml-auto xs:ml-auto lg:ml-0  lg:mt-auto lg:mb-11">
            <Popconfirm
              title="do you want log out"
              onConfirm={handleClickLogout}
            >
              <Button
                type="link"
                shape="circle"
                icon={<LogoutOutlined />}
                className="text-[#ffffffa6] hover:text-red-700"
              />
            </Popconfirm>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBarAdmin;
