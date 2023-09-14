import { Controller, Get, Param } from '@nestjs/common';
import { ApiRequestService } from './api-request.service';
import { Continent } from './model/continent.model';
import { CountryData } from './model/country-data.model';

@Controller('api-request')
export class ApiRequestController {
  constructor(private readonly apiRequestService: ApiRequestService) {}

  @Get('/all')
  async getAllCountry(): Promise<any> {
    const result = await this.apiRequestService.getAll();
    return result.data;
  }

  @Get('/caution/:lvl')
  async getLvl(@Param('lvl') lvl: number): Promise<Continent> {
    return await this.apiRequestService.getCountryByLvl(lvl);
  }

  @Get('country/:isoCode')
  async findCountry(@Param('isoCode') isoCode: string): Promise<any> {
    return await this.apiRequestService.findCountry(isoCode);
  }
}
