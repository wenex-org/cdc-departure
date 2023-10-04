import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('fortest')
export class FortestTable {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  email: string;
}
