import { Category, CategoryResponse } from "./../types/Category";

export async function getCateories(): Promise<Category[]> {
  const response = await fetch("https://opentdb.com/api_category.php");
  const data = (await response.json()) as CategoryResponse;
  return data.trivia_categories;
}
