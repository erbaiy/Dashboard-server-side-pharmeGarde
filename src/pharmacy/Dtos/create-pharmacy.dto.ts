import { IsBoolean, IsDate, IsDefined, IsMongoId, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { Types } from 'mongoose';

export class CreatePharmacyDto {

    @IsDefined({ message: "Administrator is required." })
    @IsMongoId({ message: "Administrator must be a valid MongoDB ObjectId." })
    administrator: Types.ObjectId;

    @IsDefined({ message: "The name of the pharmacy must be defined." })
    @IsNotEmpty({ message: "The name is required." })
    @IsString({ message: "The name must be a string." })
    @MaxLength(30, { message: "The name must not exceed 30 characters." })
    name: string;

    @IsDefined({ message: "The address is required." })
    @IsNotEmpty({ message: "The address is required." })
    @IsString({ message: "The address must be a text." })
    address: string;

    @IsDefined({ message: "The phone number is required." })
    @IsNotEmpty({ message: "The phone number is required." })
    @IsString({ message: "The phone number must be a string." })
    @MaxLength(15, { message: "The phone number must not exceed 15 characters." })
    phoneNumber: string;

    @IsOptional()
    @IsString({ message: "Opening hours at night must be a string." })
    openingHoursNight?: string;

    @IsDefined({ message: "Night shift status is required." })
    @IsBoolean({ message: "Night shift status must be a boolean." })
    nightshift: boolean;

    @IsDefined({ message: "Weekend shift status is required." })
    @IsBoolean({ message: "Weekend shift status must be a boolean." })
    weekendshift: boolean;

    @IsOptional()
    @IsDate({ message: "Duty date must be a valid date." })
    dutyDate?: Date;

    @IsOptional()
    @IsString({ message: "Image URL must be a string." })
    imageUrl?: string;
}
