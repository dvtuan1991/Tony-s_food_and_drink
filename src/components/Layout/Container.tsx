import { FC, ReactNode } from 'react';
import { Routes, Route } from 'react-router-dom';

import AdminHomePage from 'pages/admin/AdminHomePage';
import HomePage from 'pages/app/HomePage';
import LayoutAdmin from './LayoutAdmin';
import LayoutCustomer from './LayoutCustomer ';
import { adminRouter } from 'routes/routes.routes';
import styles from './Layout.module.css'

const Container = () => {
  const renderRoute = adminRouter.map(route => (
    <Route key={route.path} path={route.path} element={route.element} />
  ))
  return (
    <>
      <Routes>
        <Route element={<LayoutCustomer />} >
          <Route path="/app" element={<HomePage />} />
        </Route>
        <Route element={<LayoutAdmin />} >
          {renderRoute}
        </Route>
      </Routes>
    </>
  )
}

export default Container