import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import QuestionsGuard from "./guards/QuestionGuard";
import ResultGuard from "./guards/ResultGuard";
import RouterGuard from "./guards/RouterGuard";
import { AppRoute } from "./types/Common";
import Categories from "./views/categories";
import Home from "./views/home";
import Questions from "./views/questions";
import Result from "./views/Result";

const ROUTES: AppRoute[] = [
  {
    path: "/categories",
    component: Categories,
    guard: RouterGuard,
  },
  { path: "/question/", component: Questions, guard: QuestionsGuard },
  { path: "/result", component: Result, guard: ResultGuard },
  { path: "/", exact: true, component: Home },
];

const AppRoutes = () => {
  function renderRoutes(): JSX.Element[] {
    return ROUTES.map(({ component: Element, path, guard: Guard = Fragment }) => (
      <Route path={path} key={path}>
        <Guard>
          <Element />
        </Guard>
      </Route>
    ));
  }

  return <Switch>{renderRoutes()}</Switch>;
};

export default AppRoutes;
