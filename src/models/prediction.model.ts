import { getModelForClass, prop } from "@typegoose/typegoose";
export class Prediction {
  @prop()
  chainId?: number;

  @prop()
  epoch?: number;

  @prop({ lowercase: true })
  userAddress?: string;

  @prop()
  amount?: number;

  @prop()
  position?: number;

  @prop({ default: 0 })
  result?: number;

  @prop({default: 0})
  amountReward?: number;
}

export const PredictionModel = getModelForClass(Prediction);
