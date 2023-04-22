import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/service/prisma.service';
import { RoleDTO } from './role.dto';
import { UserService } from 'src/User/user.service';

@Injectable()
export class RoleService {
  constructor(
    private prisma: PrismaService,
    private userServices: UserService,
  ) {}
  async create(Role: RoleDTO): Promise<RoleDTO | undefined> {
    try {
      const data: RoleDTO = {
        name: Role.name,
      };
      return await this.prisma.role.create({
        data,
      });
    } catch (error) {
      throw new ForbiddenException();
    }
  }
  async getAll(): Promise<RoleDTO[]> {
    try {
      return await this.prisma.role.findMany();
    } catch (error) {
      throw new ForbiddenException();
    }
  }
  async add(role: Record<any, any>): Promise<any> {
    try {
      return await this.userServices.addRole(role);
    } catch (error) {
      console.log(error);
    }
  }
  async getById(id: number): Promise<RoleDTO | undefined> {
    try {
      return await this.prisma.role.findFirst({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new ForbiddenException();
    }
  }
}
