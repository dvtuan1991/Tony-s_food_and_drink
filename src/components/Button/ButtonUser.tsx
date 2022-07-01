import Typography from "antd/lib/typography";
import Avatar from "antd/lib/avatar/avatar";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Popover from "antd/lib/popover";
import Popconfirm from "antd/lib/popconfirm";
import { useState } from "react";

import { RootState } from "store";
import { SERVICE_API } from "constants/configs";
import { clearCart } from "store/cart.slice";
import { addUser } from "store/user.slice";
import { IUser } from "types/user.model";
import styles from "./Button.module.css";

const { Text } = Typography;
const ButtonUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.users);
  const [visible, setVisible] = useState(false);
  const handleClickOut = () => {
    setVisible(true);
  };
  const handleClickCancel = () => {
    setVisible(false);
  };
  const handleClickConfirm = () => {
    dispatch(addUser({} as IUser));
    dispatch(clearCart());
    localStorage.removeItem("access_token");
    setVisible(false);
    navigate("/");
  };
  if (!user.userName) {
    return (
      <Link to={"/login"} className="block p-1 border border-[#1890ff] rounded">
        Login
      </Link>
    );
  }
  return (
    <div className={styles.wrapIcon}>
      <Popover
        content={
          <div className="flex flex-col ">
            <Link to={"/profile"} className="block w-full  p-1">
              Your Profile
            </Link>
            <Popconfirm
              title={"Do you want log out"}
              visible={visible}
              onConfirm={handleClickConfirm}
              onCancel={handleClickCancel}
            >
              <Text
                className="cursor-pointer block p-1 hover:text-yellow-400"
                onClick={handleClickOut}
              >
                Log Out
              </Text>
            </Popconfirm>
          </div>
        }
        trigger={["hover", "click"]}
        placement={"bottomRight"}
        arrowPointAtCenter
      >
        {user?.userName && user.avatar && (
          <Avatar src={`${SERVICE_API}/${user.avatar}`} />
        )}
        {user.userName && !user.avatar && <Avatar>{user.name}</Avatar>}
      </Popover>
    </div>
  );
};

export default ButtonUser;
