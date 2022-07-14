import { Test, TestingModule } from '@nestjs/testing';
import { SplitPaymentsService } from './split-payments.service';

describe('SplitPaymentsService', () => {
  let service: SplitPaymentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SplitPaymentsService],
    }).compile();

    service = module.get<SplitPaymentsService>(SplitPaymentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
