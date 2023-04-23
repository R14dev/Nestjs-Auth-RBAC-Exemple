import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/service/prisma.service';
import { UserDto } from './user.dto';
import { hash, compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService, private jwt: JwtService) {}

  async create(User: UserDto) {
    try {
      const data: UserDto = {
        nome: User.nome,
        password: await this.passwordHash(User.password),
        roleId: User.roleId,
      };
      const Users = await this.find(User.nome);
      if (Users) throw new UnauthorizedException();
      return await this.prismaService.user.create({
        data: {
          nome: data.nome,
          password: data.password,
          roleId: data.roleId,
        },
      });
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  async signin(nome: string, pass: string): Promise<any> {
    try {
      const user = await this.find(nome);
      if (!user) {
        throw new UnauthorizedException();
      }
      const passwordHash = await compare(pass, user.password);

      if (!passwordHash) throw new UnauthorizedException();

      const payload = {
        username: user.nome,
        sub: user.id,
      };
      return {
        access_token: await this.jwt.signAsync(payload),
      };
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
  }

  private async passwordHash(password: string): Promise<string> {
    const hashs = await hash(password, 8);
    return hashs;
  }
  async findAll(): Promise<UserDto[] | undefined> {
    return await this.prismaService.user.findMany();
  }
  async find(nome: string): Promise<UserDto | undefined> {
    return await this.prismaService.user.findFirst({
      where: {
        nome,
      },
    });
  }

  async addRole(role: Record<any, any>): Promise<any> {
    try {
      const data = {
        roleId: role.id,
      };
      const user = await this.prismaService.user.findFirst({
        where: {
          roleId: role.id,
        },
      });
      if (user) {
        throw new UnauthorizedException();
      }
      return await this.prismaService.user.update({
        data,
        where: {
          id: role.user,
        },
      });
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
  async findById(id: number) {
    try {
      return await this.prismaService.user.findFirst({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
