import { Fragment, useEffect } from "react";
import Row from "antd/lib/row";
import { Outlet, useNavigate } from "react-router-dom";
import Col from "antd/lib/col";

import NavBarAdmin from "components/NavBar/NavBarAdmin";
import MainHeaderAdmin from "components/Main/MainHeaderAdmin";
import { useSelector } from "react-redux";
import { RootState } from "store";

const LayoutAdmin = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.users);

  // useEffect(() => {
  //   console.log(user.isAdmin);
  //   if (!user.isAdmin) {
  //     navigate("/");
  //   }
  // }, [user.isAdmin]);
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
