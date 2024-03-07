import { Module } from '@nestjs/common';
import { TrpcService } from '@server/trpc/trpc.service';
import { TrpcRouter } from '@server/trpc/trpc.router';
import { AuthModule } from '@server/auth/auth.module';
import { TotvsModule } from '@server/totvs/totvs.module';

@Module({
  imports: [AuthModule, TotvsModule],
  providers: [TrpcService, TrpcRouter],
  exports: [TrpcService],
})
export class TrpcModule {}
