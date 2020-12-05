import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Category } from './category.schema';

export type RecipeDocument = Recipe & Document;

export type Ingredient = {
  name: string;
  amount: number;
  unit: string;
};

@Schema()
export class Recipe {
  @Prop({ required: true })
  name: string;

  @Prop()
  link: string;

  @Prop()
  minutesToMake: number;

  @Prop()
  servings: number;

  @Prop(
    raw([
      {
        name: { type: String },
        unit: { type: String },
        amount: { type: Number },
      },
    ]),
  )
  ingredients: Record<string, any>;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: Category.name }],
  })
  categories: Category[];

  @Prop()
  comment: string;

  @Prop()
  rating: number;
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);