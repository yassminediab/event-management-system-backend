import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import User from '../users/entities/users.entity';
import Company from './entities/companies.entity';
import { UpdateCompanyDto } from './dto/updateCompany.dto';

export class CompanyService {
  constructor(
    @Inject('COMPANY_REPOSITORY')
    private readonly companyRepository: Repository<Company>,
  ) {}

  async update(user: User, company: UpdateCompanyDto) {
    return this.companyRepository.update(
      { userId: user?.id },
      { title: company.title },
    );
  }

  async getAll(): Promise<Company[]> {
    return this.companyRepository.find({ relations: ['user', 'followers'] });
  }

  async checkIfCompanyExists(userId) {
    return this.companyRepository.findOne({ where: { userId: userId } });
  }

  async findCompanyById(id) {
    return this.companyRepository.findOne({
      where: { id },
      relations: ['followers'],
    });
  }

  async saveCompany(company: Company) {
    return this.companyRepository.save(company);
  }
}
