import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { countryModule } from './country/country.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule.forRoot(), countryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
