import { TasksService } from "./tasks.service";
import {Test} from '@nestjs/testing';
import { TasksRepository } from "./tasks.repository";
import { getRepositoryToken } from "@nestjs/typeorm";
import { TaskStatus } from "./task-status.enum";
import { Task } from "./task.entity";
import { Repository } from "typeorm";
import { NotFoundException } from "@nestjs/common";


const mockTasksRepository = () => ({
    createQueryBuilder: jest.fn(() => {
        return {
            where: jest.fn(),
            andWhere: jest.fn(),
            getMany: jest.fn(),
        }
    }),
    findOne: jest.fn(),
});

const mockUser = {
    username: 'Fred',
    id: 'someId',
    password: 'somePassword',
    tasks: [],
}

describe('TasksService', () => {
    let tasksService: TasksService;
    let tasksRepository;

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                TasksService, 
                { provide: getRepositoryToken(Task), useFactory: mockTasksRepository},
            ],
        }).compile();
        tasksService = module.get(TasksService);
        tasksRepository = module.get(getRepositoryToken(Task));
    });

    describe('getTasks', () => {
        it('calls TasksRepository.getTasks and returns the result', async () => {
            tasksRepository.createQueryBuilder.mockReturnValue({
                where: jest.fn(),
                andWhere: jest.fn(),
                getMany: jest.fn().mockResolvedValue('someValue'),
            });
            const result = await tasksService.getTasks({status: TaskStatus.OPEN }, mockUser);
            expect(result).toEqual('someValue');
        });
    });
    
    describe('getTaskById', () => {
        it('calls TasksRepository.findOne and returns the result', async () => {
            const mockTask = {
                title: 'Test task',
                description: 'Test description',
                id: 'someid',
                status: TaskStatus.OPEN,
                user: mockUser,
            };
            tasksRepository.findOne.mockResolvedValue(mockTask);
            const result = await tasksService.getTaskById('someId', mockUser);
            expect(result).toEqual(mockTask);
        });

        it('calls TasksRepository.findOne and handles an error', async () => {
            tasksRepository.findOne.mockResolvedValue(null);
            expect(tasksService.getTaskById('someId', mockUser)).rejects.toThrow(
                NotFoundException,
              );
        });
    });
});