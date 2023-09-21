import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from 'src/user/entities';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly _reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const userRoleDecorators = this._reflector.get<string[]>(
      'rolesType',
      context.getHandler(),
    );

    if (!userRoleDecorators) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const { role } = request.user as User;

    return userRoleDecorators.includes(role);
  }
}
