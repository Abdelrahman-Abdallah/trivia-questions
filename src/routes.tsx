import React from "react";
import { Route, Routes } from "react-router-dom";
import { AppRoute } from "./types/Common";
import Home from "./views/home";

const ROUTES: AppRoute[] = [{ path: "/", component: Home }];

const AppRoutes = () => {
  function renderRoutes(): JSX.Element[] {
    return ROUTES.map(({ component: Element, path }) => <Route key={path} path={path} element={<Element />} />);
  }

  return <Routes>{renderRoutes()}</Routes>;
};

export default AppRoutes;
