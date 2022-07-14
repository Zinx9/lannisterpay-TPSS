import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SplitPaymentsModule } from './split-payments/split-payments.module';

@Module({
  imports: [SplitPaymentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
