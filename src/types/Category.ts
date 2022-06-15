export interface Category {
  id: string;
  name: string;
}

export interface CategoryResponse {
  trivia_categories: Category[];
}
