import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn({
        type: "int",
        unsigned: true,
    })
    id!: number;

    @Column({
        name: "username",
        type: "varchar",
        length: 10,
        unique: true
    })
    username!: string;

    @Column({
        name: "email",
        type: "varchar",
        length: 30,
        unique: true,
    })
    email!: string;

    @Column({
        name: "password",
        type: "varchar",
        length: 100
    })
    password!: string;

    @Column({
        name: "status",
        type: "tinyint",
        default: 1,
        comment: "1=active,0=inactive",
    })
    status!: number;

    @CreateDateColumn({
        name: "created_at",
        type: "datetime",
        nullable: true,
    })
    created_at!: Date | null;

    @UpdateDateColumn({
        name: "updated_at",
        type: "datetime",
        nullable: true,
    })
    updated_at!: Date;
}