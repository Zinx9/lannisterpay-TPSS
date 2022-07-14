import { BadRequestException, Injectable } from '@nestjs/common';
import {
  ComputeSplitPaymentsDto,
  SplitInfo,
  SplitPaymentsResponse,
} from './dto/compute-split-payments.dto';

@Injectable()
export class SplitPaymentsService {
  compute(payload: ComputeSplitPaymentsDto): SplitPaymentsResponse {
    const result: SplitPaymentsResponse = {
      ID: payload.ID,
      Balance: payload.Amount,
      SplitBreakdown: [],
    };

    let balance = payload.Amount;

    const flatSplitInfo: SplitInfo[] = [];

    const percentageSplitInfo: SplitInfo[] = [];

    const ratioSplitInfo: SplitInfo[] = [];

    payload.SplitInfo.forEach((splitInfo) => {
      switch (splitInfo.SplitType) {
        case 'FLAT':
          flatSplitInfo.push(splitInfo);
          break;
        case 'PERCENTAGE':
          percentageSplitInfo.push(splitInfo);
          break;
        case 'RATIO':
          ratioSplitInfo.push(splitInfo);
          break;
      }
    });

    if (flatSplitInfo.length) {
      const flatSplitBreakdown = [];

      flatSplitInfo.forEach((splitInfo) => {
        if (splitInfo.SplitValue > payload.Amount) {
          throw new BadRequestException(
            'Split value cannot be greater than the total amount',
          );
        }

        if (splitInfo.SplitValue < 0) {
          throw new BadRequestException('Split value cannot be less than zero');
        }

        balance -= splitInfo.SplitValue;

        flatSplitBreakdown.push({
          SplitEntityId: splitInfo.SplitEntityId,
          Amount: splitInfo.SplitValue,
        });
      });

      result.SplitBreakdown.push(...flatSplitBreakdown);
    }

    if (percentageSplitInfo.length) {
      const percentageSplitBreakdown = [];

      percentageSplitInfo.forEach((splitInfo) => {
        const amount = (balance * splitInfo.SplitValue) / 100;

        if (amount > payload.Amount) {
          throw new BadRequestException(
            'Split value cannot be greater than the total amount',
          );
        }

        if (amount < 0) {
          throw new BadRequestException('Split value cannot be less than zero');
        }

        balance -= amount;

        percentageSplitBreakdown.push({
          SplitEntityId: splitInfo.SplitEntityId,
          Amount: amount,
        });
      });

      result.SplitBreakdown.push(...percentageSplitBreakdown);
    }

    if (ratioSplitInfo.length) {
      let openingRatioBalance = balance;
      const totalRatio: number = ratioSplitInfo.reduce((acc, curr) => {
        return acc + curr.SplitValue;
      }, 0);

      const ratioSplitBreakdown = [];

      ratioSplitInfo.forEach((splitInfo) => {
        const amount =
          openingRatioBalance * (splitInfo.SplitValue / totalRatio);

        if (amount > payload.Amount) {
          throw new BadRequestException(
            'Split value cannot be greater than the total amount',
          );
        }

        if (amount < 0) {
          throw new BadRequestException('Split value cannot be less than zero');
        }

        balance -= amount;

        ratioSplitBreakdown.push({
          SplitEntityId: splitInfo.SplitEntityId,
          Amount: amount,
        });
      });

      result.SplitBreakdown.push(...ratioSplitBreakdown);
    }

    if (balance < 0) {
      throw new BadRequestException('Insufficient balance');
    }

    result.Balance = balance;

    return result;
  }
}
