import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";
import DataLoader from "dataloader";
import { GetUser } from "src/auth/get-user.decorator";
import { User } from "src/auth/user.entity";
import { GqlAuthGuard } from "./auth.guard";
import { CreateTaskDto } from "./dto/create-task.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { UpdateTaskStatusDto } from "./dto/update-task-status.dto";
import { Task } from "./task.entity";
import { TasksService } from "./tasks.service";

@Resolver('Task')
@UseGuards(GqlAuthGuard)
export class TasksResolver {
    constructor(private tasksService: TasksService) { }

    @Query()
    async getTasks(@Args('taskFilter') taskFilter: GetTasksFilterDto, @GetUser() user: User) {
        return this.tasksService.getTasks(taskFilter, user);
    }

    @Query()
    async getTaskById(@Args('id') id: string, @GetUser() user: User) {
        return this.tasksService.getTaskById(id, user);
    }

    @Mutation()
    async createTask(@Args('taskInput') createTaskDto: CreateTaskDto, @GetUser() user: User) {
        return this.tasksService.createTask(createTaskDto, user);
    }

    @Mutation()
    async updateTaskStatus(@Args('id') id: string, @Args('updateTaskInput') updateTaskStatusDto: UpdateTaskStatusDto, @GetUser() user: User) {
        const {status} = updateTaskStatusDto;
        return this.tasksService.updateTaskStatus(id, status, user);
    }

    @Mutation()
    async deleteTask(@Args('id') id: string, @GetUser() user: User) {
        return this.tasksService.deleteTask(id, user);
    }

    @ResolveField('user', () => User)
    async getUser(@Parent() task: Task,
    @Context('usersLoader') usersLoader: DataLoader<string, User>,
    ) {
      const { userId } = task;
      return usersLoader.load(userId);
    }
}