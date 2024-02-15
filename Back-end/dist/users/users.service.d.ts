import { User } from './user.entity';
import { Repository } from 'typeorm';
export declare class UsersService {
    private repository;
    constructor(repository: Repository<User>);
    create(lastname: string, firstname: string, age: number, password: string): Promise<User>;
    get(): Promise<User[]>;
    getid(id: number): Promise<User>;
    put(id: number, firstname: string, lastname: string, age: number): Promise<User>;
    delete(id: number): Promise<Boolean>;
}
