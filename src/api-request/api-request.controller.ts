import { Controller, Get, Param } from '@nestjs/common';
import { ApiRequestService } from './api-request.service';

@Controller('api-request')
export class ApiRequestController {
  constructor(private readonly apiRequestService: ApiRequestService) {}

  @Get('/all')
  async getAllCountry(): Promise<any> {
    const data = await this.apiRequestService.getAll();
    return data.data[0].alarm_lvl;
  }

  @Get('/lvl1/:page')
  getLvl1(@Param('page') page: number) {
    return this.apiRequestService.getlvl1(page);
  }
}
