import React, { FC, useState } from "react";
import { useCallback } from "react";
import { useSelector } from "src/store";
import styled from "styled-components";
import useKeyboardKey from "../../hooks/useKeyboard";
import CategoryItem from "./CategoryItem";
import { getSelectedId } from "./helpers";

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
  const { categories, isLoaded, selectedCategories } = useSelector((state) => state.categories);
  const handleKeyClick = useCallback(
    (key: string) => {
      const id = getSelectedId(
        key,
        selectedCategory,
        3,
        categories.map((cat) => cat.id)
      );
      if (id) onChangeSelectedCategory(id);
    },
    [categories, onChangeSelectedCategory, selectedCategory]
  );

  useKeyboardKey(handleKeyClick);

  function handleItemClick(catId: string): void {
    onChangeSelectedCategory(catId);
  }

  function renderCategories(): JSX.Element[] | JSX.Element {
    if (!isLoaded) return <h1>Loading...</h1>;
    return categories.map((cat) => (
      <CategoryItem
        key={cat.id}
        category={cat}
        isFocused={cat.id === selectedCategory}
        currentlySelected={selectedCategory === cat.id}
        previouslySelected={selectedCategories.includes(cat.id)}
        onItemClick={handleItemClick}
      />
    ));
  }

  return <CategoryContainer>{renderCategories()}</CategoryContainer>;
};

export default CategoriesList;
