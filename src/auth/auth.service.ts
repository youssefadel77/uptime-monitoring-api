import { Injectable } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && bcrypt.compareSync(password, user.password)) {
      delete user.password;
      return user;
    }
    return null;
  }

  async login(data: any) {
    const user = await this.userService.findByEmail(data.email);

    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await this.comparePasswords(
      data.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    // You can generate a JWT token here and return it, or any other authentication logic you prefer.
    const token = await this.generateToken(user);

    return { user, token };
  }

  async profile(userId: number) {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  async signup(
    username: string,
    email: string,
    password: string,
  ): Promise<any> {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await this.userService.createUser(
      username,
      email,
      hashedPassword,
    );
    const token = await this.generateToken(user);
    return { user, token };
  }

  async generateToken(user) {
    const payload = { sub: user.id, username: user.username };
    return this.jwtService.sign(payload);
  }
}
