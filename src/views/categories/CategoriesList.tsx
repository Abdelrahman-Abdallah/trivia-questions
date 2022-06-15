import React, { FC, useState } from "react";
import { useSelector } from "src/store";
import styled from "styled-components";
import useKeyboardKey from "../../hooks/useKeyboard";
import CategoryItem from "./CategoryItem";

const CategoryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  width: 80%;
  margin: auto;
`;

interface CategoriesListProps {
  selectedCategory: string;
  onChangeSelectedCategory: (catId: string) => void;
}

const CategoriesList: FC<CategoriesListProps> = ({ onChangeSelectedCategory, selectedCategory }) => {
  const clickedKey = useKeyboardKey(handleClickedKey);
  const { categories, isLoaded } = useSelector((state) => state.categories);
  const selectedCategories = [20];

  const [focusedId, setFocusedId] = useState("");

  function handleItemClick(catId: string): void {
    setFocusedId(catId);
    onChangeSelectedCategory(catId);
  }

  function handleClickedKey(key: string): void {
    const focusedIndex = categories.findIndex((cat) => cat.id === focusedId);
    const id = focusedIndex === -1 ? categories[0].id : categories[focusedIndex + 1].id;
    setFocusedId(id);
  }

  function renderCategories(): JSX.Element[] | JSX.Element {
    if (!isLoaded) return <h1>Loading...</h1>;
    return categories.map((cat) => (
      <CategoryItem
        key={cat.id}
        category={cat}
        isFocused={cat.id === focusedId}
        currentlySelected={selectedCategory === cat.id}
        previouslySelected={selectedCategories.includes(+cat.id)}
        onItemClick={handleItemClick}
      />
    ));
  }

  return <CategoryContainer>{renderCategories()}</CategoryContainer>;
};

export default CategoriesList;
