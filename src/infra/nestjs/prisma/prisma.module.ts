import { Module } from '@nestjs/common';
import { PrismaProvider } from 'src/infra/prisma/provider/PrismaProvider';

@Module({
  providers: [PrismaProvider],
  exports: [PrismaProvider],
})
export class PrismaModule {}

