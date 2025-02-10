import { IsBoolean, IsISO8601, IsMongoId, IsOptional, IsString, MaxLength } from "class-validator";
import { Types } from 'mongoose';

export class CreatePharmacyDto {
  @IsOptional()
  @IsMongoId({ message: "Administrator must be a valid MongoDB ObjectId." })
  administrator?: Types.ObjectId;

  @IsString({ message: "The name must be a string." })
  @MaxLength(30, { message: "The name must not exceed 30 characters." })
  name: string;

  @IsString({ message: "The address must be a text." })
  address: string;

  @IsString({ message: "The phone number must be a string." })
  @MaxLength(15, { message: "The phone number must not exceed 15 characters." })
  phoneNumber: string;

  @IsOptional()
  @IsString({ message: "Opening hours at night must be a string." })
  openingHoursNight?: string;

  @IsBoolean({ message: "Night shift status must be a boolean." })
  nightshift: boolean;

  @IsBoolean({ message: "Weekend shift status must be a boolean." })
  weekendshift: boolean;

  @IsOptional()
  @IsISO8601({ strict: true }, { message: "Duty date must be a valid ISO 8601 date string." })
  dutyDate?: Date;

  @IsOptional()
  @IsString({ message: "Image URL must be a string." })
  imageUrl?: string;

   
  @IsString({ message: "Longitude must be a string." })
  longitude: number;

  @IsString({ message: "Latitude must be a string." })
  latitude: number;
}