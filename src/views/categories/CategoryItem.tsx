import React, { FC } from "react";
import styled, { css } from "styled-components";
import { Category } from "../../types/Category";

interface CategoryItemProps {
  category: Category;
  isFocused: boolean;
  currentlySelected: boolean;
  previouslySelected: boolean;
  onItemClick: (id: string) => void;
}
interface CategoryContainerProps {
  isFocused: boolean;
  currentlySelected: boolean;
  previouslySelected: boolean;
}

const CategoryContainer = styled("div")<CategoryContainerProps>`
  padding: 2rem;
  background: #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  &:hover {
    cursor: pointer;
  }

  ${(props) =>
    props.isFocused &&
    css`
      background: #7deb59;
    `};
  ${(props) =>
    props.previouslySelected &&
    css`
      text-decoration: line-through;
      background: #7c3b1c;

      &:hover {
        cursor: not-allowed;
      }
    `};
`;

const CategoryItem: FC<CategoryItemProps> = ({ category, isFocused, currentlySelected, previouslySelected, onItemClick }) => {
  function handleClick() {
    onItemClick(category.id);
  }

  return (
    <CategoryContainer currentlySelected={currentlySelected} isFocused={isFocused} previouslySelected={previouslySelected} onClick={handleClick}>
      {category.name}
    </CategoryContainer>
  );
};

export default React.memo(CategoryItem);
