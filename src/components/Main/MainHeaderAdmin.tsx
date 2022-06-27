import Breadcrumb from "antd/lib/breadcrumb";
import { Link, useLocation } from "react-router-dom";

import HomeOutlined from "@ant-design/icons/HomeOutlined";

const MainHeaderAdmin = () => {
  const location = useLocation();
  const pathName = location?.pathname.split("/").filter((i) => i);
  const renderBreadcumItem = pathName.map((path, index) => {
    if (index === pathName.length - 1) {
      if (parseInt(path, 2) >= 0) {
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
        <Breadcrumb.Item
          className="align-middle inline-flex "
          key={index}
          href="/admin"
        >
          <HomeOutlined />
        </Breadcrumb.Item>
      );
    }
    return (
      <Breadcrumb.Item
        className="text-base "
        key={index}
        href={`/admin/${path}`}
      >
        {path}
      </Breadcrumb.Item>
    );
  });
  return (
    <div className="h-10 p-5 bg-gray-400 flex items-center justify-between">
      <Breadcrumb>{renderBreadcumItem}</Breadcrumb>
      <div className="mr-3">
        <Link to="/">Go to app</Link>
      </div>
    </div>
  );
};

export default MainHeaderAdmin;
