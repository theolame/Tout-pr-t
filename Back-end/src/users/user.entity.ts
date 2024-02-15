import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    lastname: string;
    @Column()
    firstname: string;
    @Column()
    age: number
    @Column()
    password: string;
}

