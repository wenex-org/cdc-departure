import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('fortest_table')
export class FortestTable {
  @PrimaryGeneratedColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  email: string;
}
