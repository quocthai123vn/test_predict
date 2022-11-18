import { getModelForClass, prop } from "@typegoose/typegoose";

export class User {
  @prop()
  chainId?: number;
  
  @prop({ lowercase: true })
  userAddress?: string;

  @prop({ default: 0 })
  totalWin?: number;

  @prop({ default: 0 })
  totalPrediction?: number;

  @prop({ default: 0 })
  totalReward?: number;
}

export const UserModel = getModelForClass(User);
