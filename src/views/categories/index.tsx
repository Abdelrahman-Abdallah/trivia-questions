import React, { useEffect, useState } from "react";
import Button from "src/components/Button";
import CenteredItemComponet from "src/components/CenteredItemContainer";
import { useDispatch, useSelector } from "src/store";
import Page from "../../components/page";
import PageHeader from "../../components/PageHeader";
import { fetchSliceCategories, addSelectedCategory } from "src/slices/Categories";
import CategoriesList from "./CategoriesList";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.name);
  console.log("🚀 ~ file: index.tsx ~ line 16 ~ Categories ~ user", user);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
    dispatch(fetchSliceCategories());
  }, [dispatch, user, navigate]);

  function handleChangeSelectedCategory(catId: string): void {
    setSelectedCategory(catId);
  }
  function handleSelectCategory(): void {
    dispatch(addSelectedCategory(selectedCategory));
    navigate("/question");
  }

  return (
    <Page title="categories">
      <PageHeader>Questions Categories</PageHeader>
      <CategoriesList selectedCategory={selectedCategory} onChangeSelectedCategory={handleChangeSelectedCategory} />
      <CenteredItemComponet>
        <Button topMargin={20} disabled={!selectedCategory} onClick={handleSelectCategory}>
          Play
        </Button>
      </CenteredItemComponet>
    </Page>
  );
};

export default Categories;
