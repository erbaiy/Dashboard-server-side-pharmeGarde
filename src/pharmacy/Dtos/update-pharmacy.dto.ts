import { IsBoolean, IsISO8601, IsMongoId, IsOptional, IsString, MaxLength } from "class-validator";
import { Types } from 'mongoose';

export class UpdatePharmacyDto {
  @IsOptional()
  @IsMongoId({ message: "Administrator must be a valid MongoDB ObjectId." })
  administrator?: Types.ObjectId;

  @IsOptional()
  @IsString({ message: "The name must be a string." })
  @MaxLength(30, { message: "The name must not exceed 30 characters." })
  name?: string;

  @IsOptional()
  @IsString({ message: "The address must be a text." })
  address?: string;

  @IsOptional()
  @IsString({ message: "The phone number must be a string." })
  @MaxLength(15, { message: "The phone number must not exceed 15 characters." })
  phoneNumber?: string;

  @IsOptional()
  @IsString({ message: "Opening hours at night must be a string." })
  openingHoursNight?: string;

  @IsOptional()
  @IsBoolean({ message: "Night shift status must be a boolean." })
  nightshift?: boolean;

  @IsOptional()
  @IsBoolean({ message: "Weekend shift status must be a boolean." })
  weekendshift?: boolean;

  @IsOptional()
  @IsISO8601({ strict: true }, { message: "Duty date must be a valid ISO 8601 date string." })
  dutyDate?: string;

  @IsOptional()
  @IsString({ message: "Image URL must be a string." })
  imageUrl?: string;
}