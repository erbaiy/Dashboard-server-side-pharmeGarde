import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  addFavorite(@Body() createFavoriteDto: CreateFavoriteDto) {
    return this.favoritesService.addFavorite(createFavoriteDto);
  }

  @Get(':userId')
  getUserFavorites(@Param('userId') userId: string) {
    return this.favoritesService.getUserFavorites(userId);
  }

  @Delete(':userId/:pharmacyId')
  removeFavorite(
    @Param('userId') userId: string,
    @Param('pharmacyId') pharmacyId: string,
  ) {
    return this.favoritesService.removeFavorite(userId, pharmacyId);
  }
}
