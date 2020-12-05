import { Ingredient } from '../schemas/recipe.schema';
import { Category } from '../schemas/category.schema';

export class CreateRecipeDto {
  readonly name: string;
  readonly link: string;
  readonly minutesToMake: number;
  readonly servings: number;
  readonly ingredients: Ingredient[];
  readonly categories: Category[];
  readonly comment: string;
  readonly rating: number;
}
