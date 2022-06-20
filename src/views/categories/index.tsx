import React, { useCallback, useEffect, useState } from "react";
// import Button from "src/components/Button";
import CenteredItemComponet from "src/components/CenteredItemContainer";
import { useDispatch, useSelector } from "src/store";
import Page from "../../components/page";
import PageHeader from "../../components/PageHeader";
import { fetchSliceCategories, addSelectedCategory, resetActiveQuestions } from "src/slices/Categories";
import CategoriesList from "./CategoriesList";
import { useHistory } from "react-router-dom";
import { Box, Button, Flex } from "rendition";
import Loader from "src/components/Loader";
import { getSelectedItemByKeyClick } from "src/utils/getSelectedItemByKeyClick";
import useKeyboardKey from "src/hooks/useKeyboard";
import { NUM_OF_ALLOWED_CATEGORIES, NUM_OF_ALLOWED_QUESTION } from "src/constants";

const ROW_SIZE = 3;

const Categories = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { selectedCategories, isLoaded, categories } = useSelector((state) => state.categories);
  const answers = useSelector((state) => state.answers.answers);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleChangeSelectedCategory = (catId: string): void => {
    if (selectedCategories.includes(catId)) return;
    setSelectedCategory(catId);
  };
  const handleSelectCategory = (): void => {
    if (!selectedCategory) return;
    dispatch(addSelectedCategory(selectedCategory));
    dispatch(resetActiveQuestions());

    history.push("/question");
  };

  const handleKeyClick = (key: string) => {
    if (key === "Enter") {
      handleSelectCategory();
      return;
    }

    const id = getSelectedItemByKeyClick(
      key,
      selectedCategory,
      ROW_SIZE,
      categories.map((cat) => cat.id)
    );
    if (id) handleChangeSelectedCategory(id);
  };

  useKeyboardKey(handleKeyClick);

  useEffect(() => {
    dispatch(fetchSliceCategories());
  }, [dispatch]);

  function renderCategoryContent(): JSX.Element {
    if (!isLoaded) return <Loader />;
    return (
      <>
        <CategoriesList selectedCategory={selectedCategory} onChangeSelectedCategory={handleChangeSelectedCategory} />
        <Box marginBottom="20px" paddingTop="25px" paddingBottom="25px">
          <CenteredItemComponet>
            <Button width="50%" disabled={!selectedCategory} onClick={handleSelectCategory}>
              Play
            </Button>
          </CenteredItemComponet>
        </Box>
      </>
    );
  }

  return (
    <Page title="categories">
      <PageHeader>Questions Categories</PageHeader>
      {renderCategoryContent()}

      <Flex>
        <Box>[Arrows]:Move between choices</Box>
        <Box>[Arrows]:Move between choices</Box>
      </Flex>
    </Page>
  );
};

export default Categories;
