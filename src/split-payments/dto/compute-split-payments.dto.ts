import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayNotEmpty,
  IsEmail,
  IsIn,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export type SplitType = 'FLAT' | 'RATIO' | 'PERCENTAGE';

export class SplitInfo {
  @IsIn(['FLAT', 'RATIO', 'PERCENTAGE'])
  SplitType: SplitType;

  @IsNumber()
  SplitValue: number;

  @IsString()
  SplitEntityId: string;
}

export class ComputeSplitPaymentsDto {
  @IsNumber()
  ID: number;

  @IsNumber()
  Amount: number;

  @IsIn(['NGN'])
  Currency: 'NGN';

  @IsEmail()
  CustomerEmail: string;

  @ArrayMinSize(1)
  @ArrayMaxSize(20)
  @ValidateNested({ each: true })
  @Type(() => SplitInfo)
  SplitInfo: SplitInfo[];
}

export class SplitBreakdown {
  SplitEntityId: string;
  Amount: number;
}

export class SplitPaymentsResponse {
  ID: number;
  Balance: number;
  SplitBreakdown: SplitBreakdown[];
}
