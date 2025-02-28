import { LoginDTO } from './login.dto';
import { ApiModelProperty } from '@nestjs/swagger';
import { UserRole } from '../../user/models/user-role.enum';
import { IsEmail, IsNotEmpty, IsIn } from 'class-validator';

export class RegisterDTO extends LoginDTO {
  @ApiModelProperty()
  @IsEmail()
  @IsNotEmpty()
  mail!: string;
  @ApiModelProperty({
    default: UserRole.User,
    example: UserRole.User,
    enum: ['Admin', 'User'],
  })
  @IsNotEmpty()
  @IsIn(Object.keys(UserRole))
  role!: string;
}
