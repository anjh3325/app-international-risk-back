import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [CountryController],
  providers: [CountryService],
})
export class countryModule {}
