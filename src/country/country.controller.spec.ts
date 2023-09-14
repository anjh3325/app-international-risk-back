import { Test, TestingModule } from '@nestjs/testing';
import { ApiRequestController } from './api-request.controller';
import { ApiRequestService } from './api-request.service';

describe('ApiRequestController', () => {
  let controller: ApiRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiRequestController],
      providers: [ApiRequestService],
    }).compile();

    controller = module.get<ApiRequestController>(ApiRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
