import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema()
export class Category {
  @Prop()
  name: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Category.name })
  parent: Category;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
