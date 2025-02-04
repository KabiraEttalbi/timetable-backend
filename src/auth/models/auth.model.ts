import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type AuthDocument = Auth & Document;

@Schema({ timestamps: true })
export class Auth {
  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  user: Types.ObjectId; // Reference to the user

  @Prop({ required: true })
  token: string; // Token (e.g., refresh token, password reset token)

  @Prop({ required: true })
  type: string; // Token type (e.g., 'refresh', 'resetPassword')

  @Prop({ required: true })
  expiresAt: Date; // Expiration date of the token

  @Prop({ default: false })
  isRevoked: boolean; // Indicates if the token is revoked
}

export const AuthSchema = SchemaFactory.createForClass(Auth);