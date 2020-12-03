import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Recipe } from './entities/recipe.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe) private readonly repo: Repository<Recipe>,
  ) { }

  create(createRecipeDto: CreateRecipeDto) {
    const newRecipe = new Recipe();
    newRecipe.name = createRecipeDto.name;
    newRecipe.link = createRecipeDto.link;
    newRecipe.minutesToMake = createRecipeDto.minutesToMake;
    return this.repo.save(newRecipe);
  }

  async findAll() {
    return await this.repo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} recipe`;
  }

  update(id: number, updateRecipeDto: UpdateRecipeDto) {
    return `This action updates a #${id} recipe`;
  }

  remove(id: number) {
    return `This action removes a #${id} recipe`;
  }
}
