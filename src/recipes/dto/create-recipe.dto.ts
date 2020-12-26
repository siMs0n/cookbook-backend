import { Ingredient } from '../schemas/recipe.schema';
import { Tag } from '../../tags/schemas/tag.schema';

export class CreateRecipeDto {
  readonly name: string;
  readonly link: string;
  readonly minutesToMake: number;
  readonly servings: number;
  readonly ingredients: Ingredient[];
  readonly tags: Tag[];
  readonly comment: string;
  readonly rating: number;
}

export class CreateRecipeDtoWithUserId {
  readonly name: string;
  readonly link: string;
  readonly minutesToMake: number;
  readonly servings: number;
  readonly ingredients: Ingredient[];
  readonly tags: Tag[];
  readonly comment: string;
  readonly rating: number;
  readonly userId: string;
}
