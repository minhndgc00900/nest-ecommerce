import { Body, Injectable, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { UserService } from '../../user/user.service';
import { CreateUserDTO } from '../../user/dtos/create-user.dto';
import { RolesGuard } from './roles.guard';
import { JwtAuthGuard } from './jwt.guard';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {
    super();
  }

  @Post('/register')
  async register(@Body() createUserDTO: CreateUserDTO) {
    const user = await this.userService.addUser(createUserDTO);
    return user;
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Post('/user')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post('/admin')
  getDashboard(@Request() req) {
    return req.user;
  }
}
