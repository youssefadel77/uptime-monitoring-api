import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { forwardRef } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlCheck } from '../url-chek/entities/url-chek.entity';
import { User } from '../users/entities/user.entity';
import { UrlCheckLogEntity } from '../url-chek-log/entities/url-check-log.entity';
import { JwtService } from '@nestjs/jwt'; // Import the UserService

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          password: 'mypassword',
          username: 'myuser',
          entities: [User, UrlCheck, UrlCheckLogEntity],
          database: 'mydatabase',
          synchronize: true,
          logging: true,
        }),
        forwardRef(() => UsersModule),
        PassportModule,
      ],
      controllers: [AuthController],
      providers: [AuthService, LocalStrategy, JwtStrategy, JwtService],
      exports: [AuthService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  describe('signup', () => {
    it('should call authService.signup and return the result', async () => {
      const signupData = {
        userName: 'testuser',
        email: 'test@example.com',
        password: 'password',
      };
      const expectedResult = { user: { ...signupData }, token: 'token' };

      jest.spyOn(service, 'signup').mockResolvedValue(expectedResult);

      const req: Request = { user: { userId: 1 } } as unknown as Request; // Mock the Request object

      const result = await controller.signup(req, signupData);

      expect(service.signup).toHaveBeenCalledWith(
        signupData.userName,
        signupData.email,
        signupData.password,
      );
      expect(result).toEqual(expectedResult);
    });
  });

  describe('login', () => {
    it('should call authService.login and return the result', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'password',
        id: 1,
        userName: 'testuser',
      };
      const expectedResult = { user: { ...loginData }, token: 'token' };

      jest.spyOn(service, 'login').mockResolvedValue(expectedResult);

      const req: Request = { user: { userId: 1 } } as unknown as Request; // Mock the Request object

      const result = await controller.login(req, loginData);

      expect(service.login).toHaveBeenCalledWith(loginData);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('getProfile', () => {
    it('should call authService.profile and return the result', async () => {
      const userId = 1;
      const profileResult = {
        id: userId,
        userName: 'testuser',
        email: 'test@example.com',
        password: 'password',
      };

      jest.spyOn(service, 'profile').mockResolvedValue(profileResult);

      const result = await controller.getProfile({ user: { userId } });

      expect(service.profile).toHaveBeenCalledWith(userId);
      expect(result).toEqual(profileResult);
    });
  });
});
