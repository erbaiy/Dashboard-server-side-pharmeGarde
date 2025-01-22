import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Favorite } from './favorites.schema';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { Pharmacy } from 'src/pharmacy/pharmacy.schema';


@Injectable()
export class FavoritesService {
  constructor(
    @InjectModel(Favorite.name) private readonly favoriteModel: Model<Favorite>,
  ) {}

  async addFavorite(createFavoriteDto: CreateFavoriteDto): Promise<Favorite> {

    const userId= createFavoriteDto.userId;
    const pharmacyId= createFavoriteDto.pharmacyId;

    const existingFavorite = await this.favoriteModel.findOne({userId: userId});
    if(existingFavorite){
      if (existingFavorite.pharmacies.includes(pharmacyId)) {
        throw new ForbiddenException(`Pharmacy ${pharmacyId} is already a favorite for user ${userId}`);
      }
      existingFavorite?.pharmacies.push(pharmacyId);
      return existingFavorite.save();
    }
    else{
    const favorite = new this.favoriteModel({userId: userId,pharmacies: [pharmacyId],});
    return favorite.save();
    }
    
  }

  async getUserFavorites(userId: string): Promise<Favorite[]> {
    return this.favoriteModel.find({ userId }).exec();
  }

  async removeFavorite(favoriteId: string, pharmacyId: string): Promise<Favorite | null> {
    const favorite= await this.favoriteModel.findByIdAndUpdate(favoriteId,{$pull: {pharmacies: pharmacyId }},{ new: true }).exec();
    return favorite;
  }

  async getAll(): Promise<Favorite[]>{
    const favorite = await this.favoriteModel.find({}).populate({path:'pharmacies',select: 'name address phoneNumber openingHoursNight',model: Pharmacy.name,}).exec();
    if(! favorite){
      throw new NotFoundException('No favorite found');
    }
    return favorite;
  }
}
