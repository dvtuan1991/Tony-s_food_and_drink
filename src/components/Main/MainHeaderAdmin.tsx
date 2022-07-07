import Breadcrumb from "antd/lib/breadcrumb";
import { NavLink, useLocation } from "react-router-dom";

import HomeOutlined from "@ant-design/icons/HomeOutlined";

const MainHeaderAdmin = () => {
  const location = useLocation();
  console.log(location);
  const pathName = location?.pathname.split("/").filter((i) => i);
  const renderBreadcumItem = pathName.map((path, index) => {
    if (index === pathName.length - 1) {
      if (path === "admin") {
        return (
          <Breadcrumb.Item className="align-middle inline-flex " key={index}>
            <HomeOutlined />
          </Breadcrumb.Item>
        );
      }
      if (!Number.isNaN(Number(path))) {
        return (
          <Breadcrumb.Item className="text-base " key={index}>
            detail
          </Breadcrumb.Item>
        );
      }
      if (Number.isNaN(parseInt(path, 2))) {
        return (
          <Breadcrumb.Item className="text-base" key={index}>
            {path}
          </Breadcrumb.Item>
        );
      }
    } else if (path === "admin") {
      return (
        <Breadcrumb.Item key={index}>
          <NavLink className="align-middle inline-flex" to="/admin">
            <HomeOutlined />
          </NavLink>
        </Breadcrumb.Item>
      );
    }
    return (
      <Breadcrumb.Item className="text-base " key={index}>
        <NavLink to={`/admin/${path}`}>{path}</NavLink>
      </Breadcrumb.Item>
    );
  });
  return (
    <div className="xs:mt-11 md:mt-11 lg:mt-0 h-10 p-5 bg-gray-400 flex items-center justify-between">
      <Breadcrumb>{renderBreadcumItem}</Breadcrumb>
    </div>
  );
};

export default MainHeaderAdmin;
