import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/users.entity';
import { EventsEntity } from '../../events/entities/events.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  userId: string;

  @Column({ default: 0 })
  numberOfFollowers: number;

  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  @OneToOne((type) => User, (user) => user.company)
  user?: User;

  @OneToMany((type) => EventsEntity, (event) => event.company)
  events?: Event[];

  @ManyToMany((type) => User, (user) => user.following)
  followers?: User[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;
}
export default Company;
