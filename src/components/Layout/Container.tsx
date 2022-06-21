import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";

import { adminRouter, appRouter } from "routes/routes.routes";
import { RootState } from "store";
import HomePage from "pages/app/HomePage";
import { SERVICE_API } from "constants/configs";
import { addUser } from "store/UserSlice";
import LayoutAdmin from "./LayoutAdmin";
import LayoutCustomer from "./LayoutCustomer ";

const Container = () => {
  const accessToken = localStorage.getItem("access_token");
  console.log(accessToken);
  const { user } = useSelector((state: RootState) => state.users);
  console.log(user);
  const dispatch = useDispatch();
  const renderRouteApp = appRouter.map((route) => (
    <Route key={route.path} path={route.path} element={route.element} />
  ));

  const renderRouteAdmin = adminRouter.map((route) => (
    <Route key={route.path} path={route.path} element={route.element} />
  ));

  const getData = useCallback(
    async (token: string) => {
      const responseUser = await fetch(`${SERVICE_API}/auth/user`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (responseUser.ok) {
        const userResult = await responseUser.json();
        console.log(userResult);

        dispatch(addUser(userResult));
      }
    },
    [accessToken, dispatch]
  );

  useEffect(() => {
    console.log("effect");
    if (!user.userName && !!accessToken) {
      getData(accessToken);
    }
  }, [getData, accessToken, user]);
  return (
    <Routes>
      <Route element={<LayoutCustomer />}>
        <Route path="/app" element={<HomePage />} />
        {renderRouteApp}
      </Route>
      <Route element={<LayoutAdmin />}>{renderRouteAdmin}</Route>
    </Routes>
  );
};

export default Container;
