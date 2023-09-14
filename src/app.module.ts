import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiRequestModule } from './api-request/api-request.module';

@Module({
  imports: [HttpModule, ApiRequestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
