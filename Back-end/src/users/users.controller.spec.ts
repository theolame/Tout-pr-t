import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserInput } from './user.input';
import { HttpException, HttpStatus } from '@nestjs/common';

export type MockType<T> = {
  [P in keyof T]?: jest.Mock<{}>;
};

export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn(entity => entity),
}));

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useFactory: repositoryMockFactory}
      ]
    }).compile();

    service = module.get<UsersService>(UsersService);
    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('get', () => {
    it('should return an array of users', async () => {
      const expected = Promise.all([{ 
          id: 0, 
          firstname: 'John',
          lastname: 'Doe',
          age: 23 ,
          password : 'password'
      }]);
      jest.spyOn(service, 'get').mockImplementation(() => expected);
      expect(await controller.get()).toBe(await expected);
    });
  });

  describe('getById', () => {
    it('should return a single user, with the provided id', async () => {
      const expected = await Promise.all([{ 
          id: 0, 
          firstname: 'John',
          lastname: 'Doe',
          age: 23 ,
          password : 'password'
      }]);
      jest.spyOn(service, 'getid').mockImplementation(id => {
        return Promise.resolve(expected[id]);
      });
      expect(await controller.getid({id: 0})).toBe(expected[0]);
    })
  });

  describe('create', () => {
    it('create user', async () => {
      const expected = await Promise.all([{ 
        id: 0, 
        firstname: 'John',
        lastname: 'Doe',
        age: 23 ,
        password : 'password'
    }]);
      jest.spyOn(service, 'create').mockImplementation((lastname, firstname,age,password) => {
        expected.push({id:1,firstname:lastname,lastname:firstname,age:age,password:password});
        return Promise.resolve({id:1,firstname:lastname,lastname:firstname,age:age,password:password});
      });
      expect(await controller.create({lastname:'Pierre',firstname:'Doe',age:23,password:'password'})).toStrictEqual({id:1,firstname:'Pierre',lastname:'Doe',age:23,password:'password'});
      expect(async () => {await controller.create({lastname:undefined,firstname:'Doe',age:23,password:'password'})}).rejects.toThrowError(HttpException);
    });
  });

});