import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class AuthService {
    constructor (
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> { // signup
        const { username, password } = authCredentialsDto;
        const user = this.usersRepository.create({
            username,
            password,
        });
        try {
            await this.usersRepository.save(user);
        }catch(error){
            if(error.code === '23505'){
                throw new ConflictException('Username already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
        
    }
}
