import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const checkOwnershipOrRole = createParamDecorator(
  (
    data: { resourceIdParam: string; allowedRole: string },
    ctx: ExecutionContext,
  ) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user; // Extracted from AuthGuard('jwt')
    const resourceId = request.params[data.resourceIdParam];

    // Authorization logic: check if user is admin or owns the resource
    const isAdmin = user.role === data.allowedRole;
    const isOwner = user.userId === resourceId;

    if (!isAdmin && !isOwner) {
      throw new UnauthorizedException(
        'You are not authorized to perform this action.',
      );
    }

    return user; // Optionally return the user object if needed in the handler
  },
);
