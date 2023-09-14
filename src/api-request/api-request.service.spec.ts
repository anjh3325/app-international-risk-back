import { Test, TestingModule } from '@nestjs/testing';
import { ApiRequestService } from './api-request.service';

describe('ApiRequestService', () => {
  let service: ApiRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApiRequestService],
    }).compile();

    service = module.get<ApiRequestService>(ApiRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
