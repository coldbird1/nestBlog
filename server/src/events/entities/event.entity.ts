import { Column, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index(['name', 'type'])
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column('json')
  payload: Record<string, any>;
}
