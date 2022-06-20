import React, { FC } from "react";
import { useSelector } from "src/store";
import styled from "styled-components";
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
  const { categories, selectedCategories } = useSelector((state) => state.categories);

  function handleItemClick(catId: string): void {
    onChangeSelectedCategory(catId);
  }

  function renderCategories(): JSX.Element[] | JSX.Element {
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
