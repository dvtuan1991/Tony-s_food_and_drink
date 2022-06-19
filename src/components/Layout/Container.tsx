import { Routes, Route } from "react-router-dom";

import { adminRouter } from "routes/routes.routes";
import HomePage from "pages/app/HomePage";
import LayoutAdmin from "./LayoutAdmin";
import LayoutCustomer from "./LayoutCustomer ";

const Container = () => {
  const renderRouteAdmin = adminRouter.map((route) => (
    <Route key={route.path} path={route.path} element={route.element} />
  ));

  return (
    <Routes>
      <Route element={<LayoutCustomer />}>
        <Route path="/app" element={<HomePage />} />
      </Route>
      <Route element={<LayoutAdmin />}>{renderRouteAdmin}</Route>
    </Routes>
  );
};

export default Container;
