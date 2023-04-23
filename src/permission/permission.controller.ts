import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionDTO } from './permission.dto';
import { Public } from 'src/util/Setmetadata';

@Controller('permission')
export class PermissionController {
  constructor(private permissionService: PermissionService) {}
  @Public()
  @Post()
  create(@Body() data: PermissionDTO) {
    return this.permissionService.create(data);
  }
  @Public()
  @Get()
  getAll() {
    return this.permissionService.getAll();
  }
  @Get(':id')
  getByID(@Param('id') id: number) {
    return this.permissionService.getByID(id);
  }
}
