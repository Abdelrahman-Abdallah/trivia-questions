import { FC } from "react";

export type AppRoute = {
  component: FC;
  path: string;
  exact?: boolean;
};
