import Login from "modules/app/login/Login";
import Register from "modules/app/register/Register";
import AdminHomePage from "pages/admin/AdminHomePage";
import AdminCategoryDetail from "pages/admin/category/detail/AdminCategoryDetail";
import AdminCategories from "pages/admin/category/list/AdminCategories";
import AdminOrderDetai from "pages/admin/order/detail/AdminOrderDetai";
import AdminOrders from "pages/admin/order/list/AdminOrders";
import CreateProduct from "pages/admin/product/create/CreateProduct";
import AdminProductDetail from "pages/admin/product/detail/AdminProductDetail";
import AdminProducts from "pages/admin/product/list/AdminProducts";
import HomePage from "pages/app/HomePage";
import { IRoute } from "types/route.model";
import {
  PATH_ADMIN_CATEGORY,
  PATH_ADMIN_CATEGORY_CREATE,
  PATH_ADMIN_CATEGORY_DETAIL,
  PATH_ADMIN_HOME,
  PATH_ADMIN_ORDER,
  PATH_ADMIN_ORDER_DETAIL,
  PATH_ADMIN_PRODUCT,
  PATH_ADMIN_PRODUCT_CREATE,
  PATH_ADMIN_PRODUCT_DETAIL,
  PATH_APP_CATEGORY,
  PATH_APP_HOME,
  PATH_LOGIN,
  PATH_REGISTER
} from "./routes.paths";

export const appRouter: IRoute[] = [
  {
    path: PATH_APP_HOME,
    element: <HomePage />
  },
  {
    path: PATH_LOGIN,
    element: <Login />
  },
  { path: PATH_REGISTER, element: <Register /> }
];

export const adminRouter: IRoute[] = [
  {
    path: PATH_ADMIN_HOME,
    element: <AdminHomePage />
  },
  {
    path: PATH_ADMIN_CATEGORY,
    element: <AdminCategories />
  },
  {
    path: PATH_ADMIN_CATEGORY_DETAIL,
    element: <AdminCategoryDetail />
  },
  {
    path: PATH_ADMIN_CATEGORY_CREATE,
    element: <AdminCategoryDetail />
  },
  {
    path: PATH_ADMIN_PRODUCT,
    element: <AdminProducts />
  },
  {
    path: PATH_ADMIN_PRODUCT_DETAIL,
    element: <AdminProductDetail />
  },
  {
    path: PATH_ADMIN_PRODUCT_CREATE,
    element: <CreateProduct />
  },
  {
    path: PATH_ADMIN_ORDER,
    element: <AdminOrders />
  },
  {
    path: PATH_ADMIN_ORDER_DETAIL,
    element: <AdminOrderDetai />
  }
];
