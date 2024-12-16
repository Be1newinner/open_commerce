import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { User } from './user.schema';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RoleGuard } from 'src/common/guards/role.guard';
import { Roles } from 'src/common/decorators/user.roles';
import { AuthGuard } from '@nestjs/passport';
import { checkOwnershipOrRole } from 'src/common/decorators/check-ownership-or-role.decorator';
import { checkTokenAdminRole } from 'src/common/decorators/check-token-admin-role.decorator';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // if you want authorization based on email id and password use
  // RoleGuard from common/guards/role.guard.ts file
  // @UseGuards(AuthGuard('jwt'), RoleGuard)
  // @Role('admin)
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAllUsers(
    @checkTokenAdminRole({ allowedRole: 'admin' })
    user: any,
  ): Promise<User[]> {
    console.log(user);
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Roles('admin')
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post()
  async createUser(@Body() userData: Partial<User>): Promise<User> {
    return this.userService.create(userData);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async udateUser(
    @Param('id') id: string,
    @Body() userData: Partial<User>,
    @checkOwnershipOrRole({ resourceIdParam: 'id', allowedRole: 'admin' })
    user: any,
  ): Promise<User> {
    console.log(user);
    return this.userService.update(id, userData);
  }

  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles('admin')
  @Delete()
  async deleteUser(@Param() id: string): Promise<User> {
    return this.deleteUser(id);
  }

  @Post('login')
  async loginUser(
    @Body() { email, password }: { email: string; password: string },
  ) {
    const user = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const payload = { sub: user._id, email: user.email, role: user.role };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
