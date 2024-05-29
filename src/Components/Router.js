import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./Home";
import Filter from "./Filter";
import TabsForm from "./Tabs";
import Header from "./Header";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" Component={Header} />
        <Route exact path="/" Component={Home} />
        <Route path="/filter" Component={Filter} />
        <Route path="/detail" Component={TabsForm} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
