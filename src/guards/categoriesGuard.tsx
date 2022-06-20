import React, { ReactNode, FC, Fragment } from "react";
import { Navigate } from "react-router-dom";
import { NUM_OF_ALLOWED_CATEGORIES, NUM_OF_ALLOWED_QUESTION } from "src/constants";
import { useSelector } from "src/store";

interface CategoriesGuardProps {
  children?: ReactNode;
}

const CategoriesGuard: FC<CategoriesGuardProps> = ({ children }) => {
  const { name, token } = useSelector((state) => state.user);
  const { answers } = useSelector((state) => state.answers);
  const { selectedCategories: selectedCategorys } = useSelector((state) => state.categories);

  if (!name || !token) return <Navigate to="/" />;

  if (selectedCategorys.length === NUM_OF_ALLOWED_CATEGORIES && answers.length < NUM_OF_ALLOWED_CATEGORIES * NUM_OF_ALLOWED_QUESTION) {
    return <Navigate to="/question" />;
  }

  if (selectedCategorys.length === NUM_OF_ALLOWED_CATEGORIES && answers.length >= NUM_OF_ALLOWED_CATEGORIES * NUM_OF_ALLOWED_QUESTION) {
    return <Navigate to="/result" />;
  }
  return <Fragment>{children}</Fragment>;
};

export default CategoriesGuard;
