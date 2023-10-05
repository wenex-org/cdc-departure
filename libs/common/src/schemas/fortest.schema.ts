import { buildSchema, Prop } from '@typegoose/typegoose';
import type { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

import { FortestInterface } from '../interfaces';

export class Fortest implements FortestInterface {
  _id?: ObjectId;

  @Prop()
  ref?: number;

  @Prop()
  name?: string;

  @Prop()
  email?: string;
}

export type FortestDocument = Document & Fortest;
export const FortestSchema = buildSchema(Fortest);
