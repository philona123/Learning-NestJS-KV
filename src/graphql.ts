
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class TaskFilter {
    status?: Nullable<string>;
    search?: Nullable<string>;
}

export class TaskInput {
    title?: Nullable<string>;
    description?: Nullable<string>;
}

export class UpdateTaskInput {
    status?: Nullable<string>;
}

export class Task {
    id: string;
    title?: Nullable<string>;
    description?: Nullable<string>;
    status?: Nullable<string>;
    user?: Nullable<User>;
}

export class User {
    id: string;
    username?: Nullable<string>;
    password?: Nullable<string>;
    tasks?: Nullable<Nullable<Task>[]>;
}

export abstract class IQuery {
    abstract getTasks(taskFilter?: Nullable<TaskFilter>, user?: Nullable<string>): Nullable<Task>[] | Promise<Nullable<Task>[]>;

    abstract getTaskById(id: string): Nullable<Task> | Promise<Nullable<Task>>;
}

export abstract class IMutation {
    abstract createTask(taskInput?: Nullable<TaskInput>): Nullable<Task> | Promise<Nullable<Task>>;

    abstract updateTaskStatus(id: string, updateTaskInput?: Nullable<UpdateTaskInput>): Nullable<Task> | Promise<Nullable<Task>>;

    abstract deleteTask(id: string): Nullable<Task> | Promise<Nullable<Task>>;
}

type Nullable<T> = T | null;
