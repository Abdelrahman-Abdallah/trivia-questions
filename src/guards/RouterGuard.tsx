import React, { ReactNode, FC, Fragment } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "src/store";

export const NUM_OF_ALLOWED_CATEGORIES = 3;
export const NUM_OF_ALLOWED_QUESTION = 3;

interface RouterGuardProps {
  children?: ReactNode;
}

const RouterGuard: FC<RouterGuardProps> = ({ children }) => {
  const { name, token } = useSelector((state) => state.user);
  const { answers } = useSelector((state) => state.answers);
  const { selectedCategories } = useSelector((state) => state.categories);

  if (!name || !token) return <Redirect to="/" />;
  const isResultsRedirect =
    selectedCategories.length >= NUM_OF_ALLOWED_CATEGORIES && answers.length >= NUM_OF_ALLOWED_CATEGORIES * NUM_OF_ALLOWED_QUESTION - 1;

  const isCategoryRedirect =
    selectedCategories.length <= NUM_OF_ALLOWED_CATEGORIES && answers.length < NUM_OF_ALLOWED_CATEGORIES * NUM_OF_ALLOWED_QUESTION;

  return (
    <Fragment>
      {isResultsRedirect && <Redirect to="/result" />}
      {isCategoryRedirect && <Redirect to="/categories" />}
      {children}
    </Fragment>
  );
};

export default RouterGuard;
