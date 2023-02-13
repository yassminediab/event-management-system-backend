import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import User from './entities/users.entity';
import { EditUserDto } from './dto/editProfile.dto';
import Company from '../companies/entities/companies.entity';
import { CompanyService } from '../companies/companies.service';
import EventsEntity from '../events/entities/events.entity';
import {EditCompanyProfileDto} from "./dto/editCompanyProfile.dto";

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
    private readonly companyService: CompanyService,
  ) {}

  async update(user: User, updatedUser: EditUserDto) {
    return this.userRepository.update({ id: user?.id }, { ...updatedUser });
  }

  async editCompanyProfile(user: User, updatedUser: EditCompanyProfileDto) {
     await this.userRepository.update({ id: user?.id }, { name: updatedUser?.name, email: updatedUser?.email });
     await this.companyService.update(user, {title: updatedUser?.title})
  }

  async follow(userId: string, companyId: string): Promise<boolean> {
    const company: Company = await this.companyService.findCompanyById(
      companyId,
    );
    const user: User = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['following'],
    });
    const isFollowedCompany: boolean = !!user.following.find(
      (company) => company.id == companyId,
    );
    if (!isFollowedCompany) {
      user.following.push(company);
      company.numberOfFollowers = company.numberOfFollowers + 1;
    } else {
      user.following = user.following.filter((company) => {
        return company.id !== companyId;
      });
      company.numberOfFollowers = company.numberOfFollowers - 1;
    }
    await this.companyService.saveCompany(company);
    await this.userRepository.save(user);
    return isFollowedCompany;
  }

  async getFollowing(userId: string): Promise<User> {
    const user: User = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['following'],
    });
    return user;
  }

  async getUser(userId: string): Promise<User> {
    return this.userRepository.findOne({
      where: { id: userId },
    });
  }
}
