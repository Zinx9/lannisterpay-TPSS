import { Module } from '@nestjs/common';
import { SplitPaymentsService } from './split-payments.service';
import { SplitPaymentsController } from './split-payments.controller';

@Module({
  providers: [SplitPaymentsService],
  controllers: [SplitPaymentsController]
})
export class SplitPaymentsModule {}
