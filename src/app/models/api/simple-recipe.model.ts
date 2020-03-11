export interface SimpleRecipeModel {
  id?: string;
  title: string;
  authorIds: string[];
  imageUrl: string;
  difficulty: number;
  tags: string[];
}
