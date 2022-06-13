import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import LayoutCus from "./components/Layout/LayoutCustomer ";
import HomePage from "./pages/app/HomePage";

function App() {
  return (
    <LayoutCus>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </LayoutCus>
  );
}

export default App;
