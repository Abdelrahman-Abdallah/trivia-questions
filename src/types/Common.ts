import { FC, ReactNode } from "react";

export type HOC = FC<{ children: ReactNode }>;

export type AppRoute = {
  component: FC;
  path: string;
  exact?: boolean;
  guard?: HOC;
};
