import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/service/prisma.service';
import { PermissionDTO } from './permission.dto';

@Injectable()
export class PermissionService {
  constructor(private prisma: PrismaService) {}
  async create(Permission: PermissionDTO): Promise<PermissionDTO | undefined> {
    try {
      const data: PermissionDTO = {
        name: Permission.name,
        description: Permission.description,
        roleId: Permission.roleId,
      };
      return await this.prisma.permissao.create({ data });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async getByID(id: number): Promise<PermissionDTO | undefined> {
    try {
      return await this.prisma.permissao.findFirst({ where: { id } });
    } catch (error) {
      throw new BadRequestException();
    }
  }

  async getByRoleID(roleId: number): Promise<PermissionDTO[] | undefined> {
    try {
      return await this.prisma.permissao.findMany({ where: { roleId } });
    } catch (error) {
      throw new BadRequestException();
    }
  }
  async getAll(): Promise<PermissionDTO[] | undefined> {
    try {
      return await this.prisma.permissao.findMany();
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
