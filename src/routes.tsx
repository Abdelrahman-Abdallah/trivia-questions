import React from "react";
import { Route, Routes } from "react-router-dom";
import { AppRoute } from "./types/Common";
import Categories from "./views/categories";
import Home from "./views/home";
import Questions from "./views/questions";

const ROUTES: AppRoute[] = [
  {
    path: "/categories",
    component: Categories,
  },
  { path: "/question", component: Questions },
  { path: "/", exact: true, component: Home },
];

const AppRoutes = () => {
  function renderRoutes(): JSX.Element[] {
    return ROUTES.map(({ component: Element, path }) => <Route key={path} path={path} element={<Element />} />);
  }

  return <Routes>{renderRoutes()}</Routes>;
};

export default AppRoutes;
