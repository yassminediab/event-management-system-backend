import User from '../../users/entities/users.entity';
export declare class LoginUserDto {
    password: string;
    email: string;
}
export declare class LoginUserResDto {
    token: string;
    user: User;
}
