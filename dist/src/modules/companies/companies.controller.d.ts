import { CompanyService } from './companies.service';
import { UpdateCompanyDto } from './dto/updateCompany.dto';
import { Response } from '../../types/response';
export declare class CompanyController {
    private readonly companyService;
    constructor(companyService: CompanyService);
    update(req: any, updateCompanyDto: UpdateCompanyDto): Promise<Response<any>>;
    getAll(req: any): Promise<any>;
}
