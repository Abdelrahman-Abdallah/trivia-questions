import React, { ReactNode, FC, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "src/store";

export const NUM_OF_ALLOWED_CATEGORIES = 3;
export const NUM_OF_ALLOWED_QUESTION = 3;

interface ResultGuardProps {
  children?: ReactNode;
}

const ResultGuard: FC<ResultGuardProps> = ({ children }) => {
  const { name, token } = useSelector((state) => state.user);
  const answers = useSelector((state) => state.answers.answers);

  if (!name || !token) return <Redirect to="/" />;

  return (
    <Fragment>
      {answers.length === 0 && <Redirect to="/categories" />}
      {children}
    </Fragment>
  );
};

export default ResultGuard;
