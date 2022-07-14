import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ComputeSplitPaymentsDto } from './dto/compute-split-payments.dto';
import { SplitPaymentsService } from './split-payments.service';

@Controller('split-payments')
export class SplitPaymentsController {
  constructor(private readonly splitPaymentsService: SplitPaymentsService) {}

  @Post('compute')
  @HttpCode(200)
  compute(@Body() computeSplitPaymentDto: ComputeSplitPaymentsDto) {
    return this.splitPaymentsService.compute(computeSplitPaymentDto);
  }
}
