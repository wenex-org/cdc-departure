import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('fortest')
export class Fortest {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ nullable: true })
  ref?: string;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  email?: string;
}
export type FortestEntity = Fortest;
