import { Controller, Body, Post, Get, Param, Put, Delete, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';
import { UserInput } from './user.input';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('users')
@Controller('users')
export class UsersController {

    constructor(
        private service: UsersService
    ) {}


    @Post()
    async create(@Body() input: UserInput): Promise<User> {
        if (input.lastname === undefined || input.firstname === undefined || input.age === undefined || input.password === undefined) {
            throw new HttpException('donnée manquante',HttpStatus.NOT_FOUND)
        }
        return this.service.create(input.lastname, input.firstname, input.age, input.password);
    }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async get(): Promise<User[]>{
        return this.service.get();
    }

    @Get(':id')
    async getid(@Param() parameter): Promise<User>{
        const user = this.service.getid(+parameter.id)
        if (user === undefined) throw new HttpException('utilisateur introuvable',HttpStatus.NOT_FOUND)
        return user
    }

    @Put(':id')
    async put(@Param() parameter,@Body() input: any): Promise<User>{
        const user = this.service.put(+parameter.id,input.firstname,input.lastname,input.age)
        if (user === undefined) throw new HttpException('utilisateur introuvable',HttpStatus.NOT_FOUND)
        return user;
    }

    @Delete(':id')
    async delete(@Param() parameter):Promise<boolean>{
        const bool = this.service.delete(+parameter.id)
        if (await bool === false) throw new HttpException('utilisateur introuvable',HttpStatus.NOT_FOUND)
        return true
    }
}