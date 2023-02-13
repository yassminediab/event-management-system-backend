import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn, Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Company } from '../../companies/entities/companies.entity';
import { EventsEntity } from '../../events/entities/events.entity';
import { Feedback } from '../../feedback/entities/feedback.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

  @OneToOne(() => Company, (company: Company) => company.user, {
    cascade: true,
    eager: true,
  })
  company: Company;

  @JoinTable({ name: 'rsvp' })
  @ManyToMany((type) => EventsEntity, (event) => event.rsvp)
  rsvp: EventsEntity[];

  @JoinTable({ name: 'attendance' })
  @ManyToMany((type) => EventsEntity, (event) => event.attendance)
  attendance: EventsEntity[];

  @JoinTable({ name: 'company_followers' })
  @ManyToMany((type) => Company, (company) => company.followers)
  following: Company[];

  @OneToMany((type) => Feedback, (feedback) => feedback.user)
  feedback?: Feedback[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;
}
export default User;
