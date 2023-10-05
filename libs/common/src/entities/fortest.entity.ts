import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('fortest')
export class Fortest {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name?: string;

  @Column()
  email?: string;
}
export type FortestEntity = Fortest;
