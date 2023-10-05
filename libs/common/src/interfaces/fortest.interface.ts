import { ObjectId } from 'mongodb';

export interface Fortest {
  _id?: ObjectId;

  ref?: number;
  name?: string;
  email?: string;
}
export type FortestInterface = Fortest;
