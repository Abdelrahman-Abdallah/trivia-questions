import React, { useEffect, useState } from "react";
import Button from "src/components/Button";
import CenteredItemComponet from "src/components/CenteredItemContainer";
import { useDispatch } from "src/store";
import Page from "../../components/page";
import PageHeader from "../../components/PageHeader";
import { fetchSliceCategories, addSelectedCategory } from "src/slices/Categories";
import CategoriesList from "./CategoriesList";

const Categories = () => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    dispatch(fetchSliceCategories());
  }, [dispatch]);

  function handleChangeSelectedCategory(catId: string): void {
    setSelectedCategory(catId);
  }
  function handleSelectCategory(): void {
    dispatch(addSelectedCategory(selectedCategory));
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
