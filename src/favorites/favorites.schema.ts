import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Favorite extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({required: true,type: [{type: Types.ObjectId,ref: 'Pharmacy'}] })
  pharmacies: string[];
}

export const FavoriteSchema = SchemaFactory.createForClass(Favorite);
