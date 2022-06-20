import React, { ReactNode, FC, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "src/store";

export const NUM_OF_ALLOWED_CATEGORIES = 3;
export const NUM_OF_ALLOWED_QUESTION = 3;

interface QuestionsGuardProps {
  children?: ReactNode;
}

const QuestionsGuard: FC<QuestionsGuardProps> = ({ children }) => {
  const { name, token } = useSelector((state) => state.user);
  const selectedCategories = useSelector((state) => state.categories.selectedCategories);

  if (!name || !token) return <Redirect to="/" />;

  return (
    <Fragment>
      {selectedCategories.length === 0 && <Redirect to="/categories" />}
      {children}
    </Fragment>
  );
};

export default QuestionsGuard;
