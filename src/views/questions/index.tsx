import React, { useState } from "react";
import { useSelector } from "src/store";

const Questions = () => {
  const selectedCateogy = useSelector((state) => state.categories.selectedCategorys);
  const [questions, setQuestions] = useState({});
  return <div>question</div>;
};

export default Questions;
