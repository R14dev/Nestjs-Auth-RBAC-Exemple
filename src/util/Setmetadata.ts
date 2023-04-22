import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export enum PERMISSIONS {
  ALL = 'ALL',
  READ = 'READ',
  REMOVE = 'REMOVE',
  EDIT = 'EDIT',
  ADICIONAR = 'ADICIONAR',
}
export const IS_Permission = 'IS_Permission';
export const Permission = (...Permissions: PERMISSIONS[]) =>
  SetMetadata(IS_Permission, Permissions);
