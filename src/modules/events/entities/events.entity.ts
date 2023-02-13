import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Company } from '../../companies/entities/companies.entity';
import DateTimeFormat = Intl.DateTimeFormat;
import User from '../../users/entities/users.entity';
import { Feedback } from '../../feedback/entities/feedback.entity';

@Entity('event')
export class EventsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  location: string;

  @Column()
  description: string;

  @Column()
  companyId: string;

  @Column({ type: 'timestamp' })
  date: Date;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;

  @Column({ default: 0 })
  numberOfAttendance: number;

  @Column({ default: 0 })
  numberOfRsvp: number;

  @JoinColumn({ name: 'companyId', referencedColumnName: 'id' })
  @ManyToOne((type) => Company, (company) => company.events)
  company: Company;

  @ManyToMany((type) => User, (user) => user.rsvp, {eager: true})
  rsvp: User[];

  @ManyToMany((type) => User, (user) => user.attendance)
  attendance: User[];

  @OneToMany((type) => Feedback, (feedback) => feedback.event)
  feedback?: Feedback[];
}
export default EventsEntity;
