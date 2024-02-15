import { User } from './user.entity';
import { UsersService } from './users.service';
import { UserInput } from './user.input';
export declare class UsersController {
    private service;
    constructor(service: UsersService);
    create(input: UserInput): Promise<User>;
    get(): Promise<User[]>;
    getid(parameter: any): Promise<User>;
    put(parameter: any, input: any): Promise<User>;
    delete(parameter: any): Promise<boolean>;
}
