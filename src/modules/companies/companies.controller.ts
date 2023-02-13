import { CompanyService } from './companies.service';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Request, UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { UpdateCompanyDto } from './dto/updateCompany.dto';
import { Response } from '../../types/response';
import Company from './entities/companies.entity';
import { TransformGetAllCompaniesResponseInterceptor } from './interceptors/transform-getAllCompanies-response.interceptor';
import {BadRequestExceptionFilter} from "../../filters/bad-request-exception";

@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Put()
  @UseGuards(JwtAuthGuard)
  @UseFilters(BadRequestExceptionFilter)
  async update(
    @Request() req,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ): Promise<Response<any>> {
    const result = await this.companyService.update(req.user, updateCompanyDto);
    if (result.affected == 0) {
      throw new BadRequestException('You Do Not Have Company');
    }
    return {
      message: 'Company is Updated successfully',
      data: {},
    };
  }

  @Get()
  @UseInterceptors(TransformGetAllCompaniesResponseInterceptor)
  @UseGuards(JwtAuthGuard)
  async getAll(@Request() req): Promise<any> {
    return {
      message: 'Get All Companies',
      data: await this.companyService.getAll(),
      userId: req.user.id,
    };
  }
}
