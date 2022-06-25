
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

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
    <>
      <NavBarAdmin />
      {user.isAdmin && (
        <div className={styles["main-admin"]}>
          <main>
            <MainHeaderAdmin />
            <div className="px-5 bg-[#ccceba]">
              <Outlet />
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default LayoutAdmin;
