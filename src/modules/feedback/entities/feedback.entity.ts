import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EventsEntity } from '../../events/entities/events.entity';
import User from '../../users/entities/users.entity';

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  feedback: string;

  @Column()
  eventId: string;

  @Column()
  userId: string;

  @JoinColumn({ name: 'eventId', referencedColumnName: 'id' })
  @ManyToOne((type) => EventsEntity, (event) => event.feedback)
  event: EventsEntity;

  @JoinColumn({ name: 'userId', referencedColumnName: 'id' })
  @ManyToOne((type) => User, (user) => user.feedback)
  user: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;
}
export default EventsEntity;
