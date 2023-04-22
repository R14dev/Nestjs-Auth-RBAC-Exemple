import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { PrismaService } from 'src/service/prisma.service';
import { UserService } from 'src/User/user.service';
import { AuthGuard } from 'src/User/User.guard';

@Module({
  imports: [],
  providers: [RoleService, PrismaService, UserService],
  controllers: [RoleController],
  exports: [RoleService],
})
export class RoleModule {}
