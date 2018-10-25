import { AuthService } from './auth.service';
import {
  Controller,
  Get,
  Req,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';

@Controller('services/rest/security/v1')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Get('currentuser')
  async getCurrentUser(@Req() req: Request) {
    try {
      const user = await this._authService.getCurrentUser();
      const response = {
        name: user.username,
        role: user.role,
      };
      req.res.send(response);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
