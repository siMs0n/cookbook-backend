import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag, TagDocument } from './schemas/tag.schema';

@Injectable()
export class TagsService {
  constructor(@InjectModel(Tag.name) private tagModel: Model<TagDocument>) { }

  async create(createTagDto: CreateTagDto) {
    const createdTag = new this.tagModel(createTagDto);
    return createdTag.save();
  }

  async findAll() {
    return this.tagModel.find().exec();
  }

  async findOne(id: string) {
    try {
      return await this.tagModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find tag.');
    }
  }

  async update(id: string, updateTagDto: UpdateTagDto) {
    try {
      const result = await this.tagModel
        .updateOne({ _id: id }, updateTagDto)
        .exec();
      if (result.n === 0) {
        throw new NotFoundException('Could not find tag to update.');
      }
      return await this.tagModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find tag to update.');
    }
  }

  async remove(id: string) {
    const result = await this.tagModel.deleteOne({ _id: id }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find tag.');
    }
    return 'Tag was deleted';
  }
}
