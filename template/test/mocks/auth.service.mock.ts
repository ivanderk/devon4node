import { SignOptions, sign } from 'jsonwebtoken';
import { JwtPayload } from '../../src/shared/auth/model/jwt-payload.interface';
import { User } from '../../src/shared/user/models/user.entity';

export class AuthServiceMock {
  private jwtOptions: SignOptions;
  private jwtKey: string | undefined;

  constructor() {
    this.jwtOptions = { expiresIn: '8h' };
    this.jwtKey = 'SuperPassword';
  }

  async signPayload(payload: JwtPayload): Promise<string> {
    return sign(payload, this.jwtKey!, this.jwtOptions);
  }
  async validatePayload(_payload: JwtPayload): Promise<User> {
    const result: User = {
      id: 1,
      username: 'test',
      mail: 'test@mail.com',
      password: 'password',
      role: 'User',
      createdAt: new Date(),
      updatedAt: new Date(),
      hasId: () => true,
      save: () => new Promise<User>(resolve => resolve(undefined)),
      remove: () => new Promise<User>(resolve => resolve(undefined)),
      reload: () =>
        new Promise<void>(() => {
          // nothing to do here
        }),
    };
    return result;
  }
}
