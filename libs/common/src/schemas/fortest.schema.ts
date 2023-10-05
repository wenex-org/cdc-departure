import { buildSchema, Prop } from '@typegoose/typegoose';
import type { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

import { FortestInterface } from '../interfaces';

export class Fortest implements FortestInterface {
  _id?: ObjectId;

  @Prop({ required: false })
  ref?: number;

  @Prop({ required: false })
  name?: string;

  @Prop({ required: false })
  email?: string;
}

export type FortestDocument = Document & Fortest;
export const FortestSchema = buildSchema(Fortest);
