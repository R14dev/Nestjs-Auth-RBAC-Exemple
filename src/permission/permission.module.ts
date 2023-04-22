import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { PrismaService } from 'src/service/prisma.service';

@Module({
  providers: [PrismaService, PermissionService],
  controllers: [PermissionController],
  exports: [PermissionService],
})
export class PermissaoModule {}
