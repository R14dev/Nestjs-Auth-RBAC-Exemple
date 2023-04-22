import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { jwtConstants } from './constants';
import { Reflector } from '@nestjs/core';
import {
  IS_PUBLIC_KEY,
  IS_Permission,
  PERMISSIONS,
} from 'src/util/Setmetadata';
import { UserService } from './user.service';
import { RoleService } from 'src/role/role.service';
import { PermissionService } from 'src/permission/permission.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private JwtServices: JwtService,
    private reflet: Reflector,
    private UserServices: UserService,
    private roleServices: RoleService,
    private permissionService: PermissionService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflet.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const Permissions = this.reflet.getAllAndOverride<PERMISSIONS[]>(
      IS_Permission,
      [context.getHandler(), context.getClass()],
    );

    if (!isPublic) {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new UnauthorizedException();
      }

      try {
        const payload = this.JwtServices.verify(token, {
          secret: jwtConstants.secret,
        });
        request['user'] = payload;
        // user permission check
        const { sub: id } = request['user'];
        this.Permission(id, Permissions);
        return true;
      } catch (error) {
        throw new UnauthorizedException();
      }
    }
    return true;
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const headers = request.headers.authorization;
    if (!headers) throw new UnauthorizedException();
    const [type, token] = request.headers.authorization.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private async Permission(id: number, data: PERMISSIONS[]) {
    try {
      const User = await this.UserServices.findById(id);
      const role = await this.roleServices.getById(User.roleId);
      if (role) {
        const roles = await this.permissionService.getByRoleID(User.roleId);
        const Previles = [];
        roles.forEach((role) => {
          Previles.push(role.name);
        });
        if (!this.compare(data, Previles)) {
          throw new UnauthorizedException();
        }
      }
    } catch (error) {
      console.error(error);
      throw new BadRequestException();
    }
  }
  private compare(a: PERMISSIONS[], b: PERMISSIONS[]): boolean {
    if (JSON.stringify(a) === JSON.stringify(b)) {
      return true;
    }
    return false;
  }
}
