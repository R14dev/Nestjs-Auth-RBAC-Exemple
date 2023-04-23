import { Module } from '@nestjs/common';
import { UserModule } from './User/user.module';
import { RoleModule } from './role/role.module';
import { PermissaoModule } from './permission/permission.module';
@Module({
  imports: [UserModule, RoleModule, PermissaoModule],
  providers: [],
  controllers: [],
})
export class AppModule {}
