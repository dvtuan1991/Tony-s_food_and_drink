import Row from "antd/lib/row";
import { Navigate, Outlet } from "react-router-dom";
import Col from "antd/lib/col";

import NavBarAdmin from "components/NavBar/NavBarAdmin";
import MainHeaderAdmin from "components/Main/MainHeaderAdmin";
import { useSelector } from "react-redux";
import { RootState } from "store";

const LayoutAdmin = () => {
  const { user } = useSelector((state: RootState) => state.users);

  if (Object.keys(user).length > 0 && !user.isAdmin) {
    return <Navigate to={"/"} />;
  }

  if (!localStorage.getItem("access_token")) {
    return <Navigate to={"/"} />;
  }

  return (
    <Row>
      {user.isAdmin && (
        <>
          <Col span={4} className=" bg-[#001529]">
            <NavBarAdmin />
          </Col>
          <Col span={20}>
            <div className="container">
              <main>
                <MainHeaderAdmin />
                <Outlet />
              </main>
            </div>
          </Col>
        </>
      )}
    </Row>
  );
};

export default LayoutAdmin;
