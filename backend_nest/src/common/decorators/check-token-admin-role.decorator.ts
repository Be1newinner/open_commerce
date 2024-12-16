import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export const checkTokenAdminRole = createParamDecorator(
  (data: { allowedRole: string }, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user; // Extracted from AuthGuard('jwt')

    // Authorization logic: check if user is admin
    const isAdmin = user.role === data.allowedRole;

    if (!isAdmin) {
      throw new UnauthorizedException(
        'You are not authorized to perform this action.',
      );
    }

    return user; // Optionally return the user object if needed in the handler
  },
);
