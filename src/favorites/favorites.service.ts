import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Favorite } from './favorites.schema';
import { CreateFavoriteDto } from './dto/create-favorite.dto';


@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel(Favorite.name) private readonly favoriteModel: Model<Favorite>,
  ) {}

  async addFavorite(createFavoriteDto: CreateFavoriteDto): Promise<Favorite> {
    const favorite = new this.favoriteModel(createFavoriteDto);
    return favorite.save();
  }

  async getUserFavorites(userId: string): Promise<Favorite[]> {
    return this.favoriteModel.find({ userId }).exec();
  }

  async removeFavorite(userId: string, pharmacyId: string): Promise<void> {
    await this.favoriteModel.deleteOne({ userId, pharmacyId }).exec();
  }

  async getAll(): Promise<Favorite[]>{
    return this.favoriteModel.find({});
  }
}
