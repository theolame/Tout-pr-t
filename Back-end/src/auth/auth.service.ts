import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import {JwtService} from '@nestjs/jwt'
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {

    constructor(
        private userservice: UsersService ,
        private jwtService: JwtService
    ) {}

    public async validateUser(id: number, password: string) : Promise<User> {
        let user: User = await this.userservice.getid(id);
        if(user===undefined || !bcrypt.compareSync(password, user.password)){return undefined}
        else{return user}
    }

    async login(user: any) {
        const payload = { username: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

}


