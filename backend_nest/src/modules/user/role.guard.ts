import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requireRoles = this.reflector.get('roles', context.getHandler());
    if (!requireRoles) return true;

    const { user } = context.switchToHttp().getRequest();

    return requireRoles.includes(user.role);
  }
}
