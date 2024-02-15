import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

    constructor(
    @InjectRepository(User)
    private repository: Repository<User>
    ) {
        //this.create("Doe","John",23,"password")
    }

    async create(lastname: string, firstname: string, age: number, password:string): Promise<User> {
        const hash = await bcrypt.hash(password, 10);
        return this.repository.save(this.repository.create({lastname, firstname, age, password : hash}))
    }

    async get() : Promise<User[]>{
        return await this.repository.find();
    }

    async getid(id:number): Promise<User> {
        const user = await  this.repository.findOne({where: {id: Equal(id)}});
        if (user === null){return undefined};
        return user
    }

    async put(id:number,firstname:string,lastname:string,age:number):Promise<User>{
        const user = await  this.repository.findOne({where: {id: Equal(id)}});
        if ( user !== undefined){
            if (firstname !== undefined){
                user.firstname = firstname
            }
            if (lastname !== undefined){
                user.lastname = lastname
            }
            if (age !== undefined){
                user.age = age
            }
        }
        return user
    }

    async delete(id:number):Promise<Boolean>{
        return (await this.repository.delete(id)).affected !== 0
    }
}
