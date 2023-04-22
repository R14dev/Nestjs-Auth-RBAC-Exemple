import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleDTO } from './role.dto';
import { PERMISSIONS, Permission, Public } from 'src/util/Setmetadata';

@Controller('role')
export class RoleController {
  constructor(private roleservice: RoleService) {}
  @Public()
  @Post()
  create(@Body() data: RoleDTO) {
    return this.roleservice.create(data);
  }
  @Get()
  getAll() {
    return this.roleservice.getAll();
  }
  @Post('/add')
  @Permission(PERMISSIONS.ADICIONAR, PERMISSIONS.ALL)
  add(@Body() data: any) {
    return this.roleservice.add(data);
  }
  @Get(':id')
  getByID(@Param('id') id: number) {
    return this.roleservice.getById(id);
  }
}
