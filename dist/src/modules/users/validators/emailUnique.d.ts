import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
import { Repository } from 'typeorm';
import User from '../entities/users.entity';
export declare class emailUnique implements ValidatorConstraintInterface {
    private userRepository;
    constructor(userRepository: Repository<User>);
    validate(email: string): Promise<boolean>;
    defaultMessage(args: ValidationArguments): string;
}
