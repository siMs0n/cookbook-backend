import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import {
  CreateRecipeDto,
  CreateRecipeDtoWithUserId,
} from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { User } from 'src/users/user.decorator';
import { UserDTO } from 'src/users/dto/user.dto';
import { getRecipe } from './scrapers/ica.scraper';
import { url } from 'inspector';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  create(@Body() createRecipeDto: CreateRecipeDto, @User() user: UserDTO) {
    const createRecipeDtoWithUserId: CreateRecipeDtoWithUserId = {
      ...createRecipeDto,
      userId: user.userId,
    };
    return this.recipesService.create(createRecipeDtoWithUserId);
  }

  @Get()
  findAll(@User() user: UserDTO) {
    return this.recipesService.findAll(user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
    return this.recipesService.update(id, updateRecipeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipesService.remove(id);
  }

  @Post('/scrape')
  crawl(@Body() body: { url: string }) {
    if (!body.url.includes('ica.se')) {
      throw new BadRequestException('Website not supported');
    }
    return getRecipe(body.url);
  }
}
