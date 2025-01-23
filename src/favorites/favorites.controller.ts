import { Controller, Post, Get, Delete, Body, Param, Put } from '@nestjs/common';
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

  @Put('/:favoriteId')
  removeFavorite(
    @Param('favoriteId') favoriteId: string,
    @Body('pharmacyId') pharmacyId: string,
  ) {
    return this.favoritesService.removeFavorite(favoriteId, pharmacyId);
  }

  @Get()
  getAll(){
    return this.favoritesService.getAll();
  }
}
