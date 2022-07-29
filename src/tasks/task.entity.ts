import { Exclude } from "class-transformer";
import { User } from "src/auth/user.entity";
import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./task-status.enum";


@Entity("tasks")
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    title: string;
    @Column()
    description: string;
    @Column()
    status: TaskStatus;
    @ManyToOne(_type => User, user => user.tasks, { eager: false })
    @Exclude({toPlainOnly: true})
    user: User;
}