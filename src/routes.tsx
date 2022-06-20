import React, { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import CategoriesGuard from "./guards/categoriesGuard";
import { AppRoute } from "./types/Common";
import Categories from "./views/categories";
import Home from "./views/home";
import Questions from "./views/questions";
import Result from "./views/Result";

const ROUTES: AppRoute[] = [
  {
    path: "/categories",
    component: Categories,
    guard: CategoriesGuard,
  },
  { path: "/question", component: Questions },
  { path: "/result", component: Result },
  { path: "/", exact: true, component: Home },
];

const AppRoutes = () => {
  function renderRoutes(): JSX.Element[] {
    return ROUTES.map(({ component: Element, path, guard: Guard = Fragment }) => (
      <Route
        key={path}
        path={path}
        element={
          <Guard>
            <Element />
          </Guard>
        }
      />
    ));
  }

  return <Routes>{renderRoutes()}</Routes>;
};

export default AppRoutes;
