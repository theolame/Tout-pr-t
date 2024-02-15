"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    constructor(repository) {
        this.repository = repository;
    }
    async create(lastname, firstname, age, password) {
        const hash = await bcrypt.hash(password, 10);
        return this.repository.save(this.repository.create({ lastname, firstname, age, password: hash }));
    }
    async get() {
        return await this.repository.find();
    }
    async getid(id) {
        const user = await this.repository.findOne({ where: { id: (0, typeorm_2.Equal)(id) } });
        if (user === null) {
            return undefined;
        }
        ;
        return user;
    }
    async put(id, firstname, lastname, age) {
        const user = await this.repository.findOne({ where: { id: (0, typeorm_2.Equal)(id) } });
        if (user !== undefined) {
            if (firstname !== undefined) {
                user.firstname = firstname;
            }
            if (lastname !== undefined) {
                user.lastname = lastname;
            }
            if (age !== undefined) {
                user.age = age;
            }
        }
        return user;
    }
    async delete(id) {
        return (await this.repository.delete(id)).affected !== 0;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map