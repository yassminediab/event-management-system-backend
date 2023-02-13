import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import User from '../entities/users.entity';

@ValidatorConstraint({ name: 'nameUnique', async: true })
@Injectable()
export class emailUnique implements ValidatorConstraintInterface {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async validate(email: string): Promise<boolean> {
    const user: User = await this.userRepository.findOne({ where: { email } });
    return !user;
  }

  defaultMessage(args: ValidationArguments): string {
    return 'Email is already exist';
  }
}
