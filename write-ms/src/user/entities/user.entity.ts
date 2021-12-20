import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  versionKey: false,
})
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop({ default: false })
  is_confirmed: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
