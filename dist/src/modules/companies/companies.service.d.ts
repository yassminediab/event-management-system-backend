import { Repository } from 'typeorm';
import User from '../users/entities/users.entity';
import Company from './entities/companies.entity';
import { UpdateCompanyDto } from './dto/updateCompany.dto';
export declare class CompanyService {
    private readonly companyRepository;
    constructor(companyRepository: Repository<Company>);
    update(user: User, company: UpdateCompanyDto): Promise<import("typeorm").UpdateResult>;
    getAll(): Promise<Company[]>;
    checkIfCompanyExists(userId: any): Promise<Company>;
    findCompanyById(id: any): Promise<Company>;
    saveCompany(company: Company): Promise<Company>;
}
