import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';
import { Tag } from '../../tags/schemas/tag.schema';
import { User } from '../../users/schemas/user.schema';

export type RecipeDocument = Recipe & Document;

export type Ingredient = {
  name: string;
  quantity: number | null;
  unit: string | null;
  quantityAndUnitLabel: string;
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

  @Prop()
  description: string;

  @Prop()
  cookingSteps: string[];

  @Prop(
    raw([
      {
        name: { type: String },
        unit: { type: String },
        quantity: { type: Number },
        quantityAndUnitLabel: { type: String }, // for example ca 25 g
      },
    ]),
  )
  ingredients: Record<string, any>;

  @Prop({
    type: [{ type: MongooseSchema.Types.ObjectId, ref: Tag.name }],
  })
  tags: Tag[];

  @Prop()
  comment: string;

  @Prop()
  rating: number;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: User.name,
  })
  userId: Types.ObjectId;
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
