import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ApiRequestController } from './api-request.controller';
import { ApiRequestService } from './api-request.service';

@Module({
  imports: [HttpModule],
  controllers: [ApiRequestController],
  providers: [ApiRequestService],
})
export class ApiRequestModule {}
