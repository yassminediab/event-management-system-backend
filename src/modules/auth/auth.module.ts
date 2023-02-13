import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt-strategy';
import { AuthService } from './auth.service';
import { userProviders } from '../users/user.providers';
import { DatabaseModule } from '../../database/database.module';
import { AuthController } from './auth.controller';
import { emailUnique } from '../users/validators/emailUnique';
import {CompanyService} from "../companies/companies.service";
import {companyProviders} from "../companies/company.providers";

@Module({
  imports: [
    PassportModule,
    DatabaseModule,
    JwtModule.register({
      secretOrPrivateKey: 'jwtSecret',
      signOptions: { expiresIn: '200d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    AuthService,
    ...userProviders,
    emailUnique,
    JwtService,
    CompanyService, ...companyProviders
  ],
  exports: [],
})
export class AuthModule {}
