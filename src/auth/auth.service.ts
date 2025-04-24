import { BadRequestException, Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, LoginUserDto } from './dto';
import { JwtPayload } from './interfaces';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  private readonly logger = new Logger('AuthService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto;

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync( password, 10 )
      });

      await this.userRepository.save(user);
      delete (user as any).password;
      
      return {
        ...user,
        token: this.getJwtToken({ id: user.id })
      };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true }
    });

    if (!user) {
      throw new UnauthorizedException('Credentials are not valid (email)');
    }
      
    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Credentials are not valid (password)');
    }
    
    delete (user as any).password;
    
    return {
      ...user,
      token: this.getJwtToken({ id: user.id })
    };
  }

  private getJwtToken(payload: JwtPayload) {
    return this.jwtService.sign( payload );
  }

  private handleDBErrors( error: any ): never {

    this.logger.error(error)

    if ( error.code === '23505' ) {
      throw new BadRequestException( error.detail );
    }
    
    throw new InternalServerErrorException('Please check server logs');
  }
}
