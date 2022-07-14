import { Test, TestingModule } from '@nestjs/testing';
import { SplitPaymentsController } from './split-payments.controller';

describe('SplitPaymentsController', () => {
  let controller: SplitPaymentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SplitPaymentsController],
    }).compile();

    controller = module.get<SplitPaymentsController>(SplitPaymentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
