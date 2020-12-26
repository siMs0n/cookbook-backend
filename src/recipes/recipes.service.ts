import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateRecipeDtoWithUserId } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe, RecipeDocument } from './schemas/recipe.schema';

@Injectable()
export class RecipesService {
  constructor(
    @InjectModel(Recipe.name) private recipeModel: Model<RecipeDocument>,
  ) {}

  async create(
    createRecipeDtoWithUserId: CreateRecipeDtoWithUserId,
  ): Promise<Recipe> {
    const createdRecipe = new this.recipeModel(createRecipeDtoWithUserId);
    return createdRecipe.save();
  }

  async findAll(userId: string): Promise<Recipe[]> {
    const userObjectId = new Types.ObjectId(userId);
    return this.recipeModel
      .find({ userId: userObjectId })
      .populate('tags')
      .exec();
  }

  async findOne(id: string) {
    try {
      return await this.recipeModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find recipe.');
    }
  }

  async update(id: string, updateRecipeDto: UpdateRecipeDto) {
    try {
      const result = await this.recipeModel
        .updateOne({ _id: id }, updateRecipeDto)
        .exec();
      if (result.n === 0) {
        throw new NotFoundException('Could not find recipe to update.');
      }
      return await this.recipeModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find recipe to update.');
    }
  }

  async remove(id: string) {
    const result = await this.recipeModel.deleteOne({ _id: id }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find recipe.');
    }
    return 'Recipe was deleted';
  }
}
