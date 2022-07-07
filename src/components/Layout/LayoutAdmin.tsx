import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Row from "antd/lib/row";
import Col from "antd/lib/col";

import { RootState } from "store";
import NavBarAdmin from "components/NavBar/NavBarAdmin";
import MainHeaderAdmin from "components/Main/MainHeaderAdmin";
import styles from "./layout.module.css";

const LayoutAdmin = () => {
  const { user } = useSelector((state: RootState) => state.users);

  if (Object.keys(user).length > 0 && !user.isAdmin) {
    return <Navigate to={"/"} />;
  }

  if (!localStorage.getItem("access_token")) {
    return <Navigate to={"/"} />;
  }

  return (
    <div>
      {user.isAdmin && (
        <>
          <NavBarAdmin />
          <div className={styles["main-admin"]}>
            <main>
              <Row>
                <Col span={24}>
                  <MainHeaderAdmin />
                </Col>
                <Col span={24}>
                  <div className="px-5">
                    <Outlet />
                  </div>
                </Col>
              </Row>
            </main>
          </div>
        </>
      )}
    </div>
  );
};

export default LayoutAdmin;
