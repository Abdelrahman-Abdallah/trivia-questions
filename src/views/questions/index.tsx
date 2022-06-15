import React, { useEffect, useState } from "react";
import Page from "src/components/page";
import { getQuestions } from "src/lib/questions";
import { useSelector } from "src/store";
import { Question } from "src/types/Question";

const Questions = () => {
  const selectedCateogy = useSelector((state) => state.categories.selectedCategorys);
  const { level, token } = useSelector((state) => state.user);
  const [questions, setQuestions] = useState<Question[]>([]);
  const category = selectedCateogy[selectedCateogy.length - 1];

  useEffect(() => {
    getQuestions(level, token, category).then((res) => {
      console.log(res);
      setQuestions(res);
    });
  }, [level, token, category]);

  return <Page title="Questions"></Page>;
};

export default Questions;
