import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { countryModule } from './country/country.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';

@Module({
  imports: [HttpModule, ConfigModule.forRoot(), countryModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
