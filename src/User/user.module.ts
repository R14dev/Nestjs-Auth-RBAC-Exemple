import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from 'src/service/prisma.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './User.guard';
import { RoleModule } from 'src/role/role.module';
import { PermissaoModule } from 'src/permission/permission.module';

@Module({
  imports: [
    RoleModule,
    PermissaoModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '10m' },
    }),
  ],
  providers: [
    UserService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
