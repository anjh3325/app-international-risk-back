import { Controller, Get, Param } from '@nestjs/common';
import { ApiRequestService } from './api-request.service';

@Controller('api-request')
export class ApiRequestController {
  constructor(private readonly apiRequestService: ApiRequestService) {}

  @Get('/all')
  async getAllCountry(): Promise<any> {
    const result = await this.apiRequestService.getAll();
    return result.data;
  }

  @Get('/caution/:lvl')
  async getLvl(@Param('lvl') lvl: number) {
    return await this.apiRequestService.getCountryByLvl(lvl);
  }
}
