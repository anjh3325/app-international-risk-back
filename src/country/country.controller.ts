import { Controller, Get, Param } from '@nestjs/common';
import { CountryService } from './country.service';
import { Continent } from './model/continent.model';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get('/all')
  async getAllCountry(): Promise<any> {
    const result = await this.countryService.getAll();
    return result.data;
  }

  @Get('/caution/:lvl')
  async getLvl(@Param('lvl') lvl: number): Promise<Continent> {
    return await this.countryService.getCountryByLvl(lvl);
  }

  @Get('/:isoCode')
  async findCountry(@Param('isoCode') isoCode: string): Promise<any> {
    return await this.countryService.findCountry(isoCode);
  }
}
