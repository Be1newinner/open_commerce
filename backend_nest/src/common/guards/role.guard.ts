import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requireRoles = this.reflector.get('roles', context.getHandler());
    if (!requireRoles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return requireRoles.includes(user.role);
  }
}
