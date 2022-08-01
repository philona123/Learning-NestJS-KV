import * as DataLoader from 'dataloader';
import { User } from 'src/auth/user.entity';
import { getRepository } from 'typeorm';
import { Task } from './task.entity';
import { AuthService } from '../auth/auth.service';


export const createUsersLoader = (authService: AuthService) => new DataLoader<string, User>(async (ids: string[]) => {
    // const task = await getRepository(Task).createQueryBuilder('task').leftJoinAndSelect('task.user', 'user').where('task.id IN (:...id)', { id }).getMany();
    const users = await authService.getUsersByIds(ids);
    const usersMap = {};
    users.forEach(user => {usersMap[user.id] = user});
    console.log(usersMap);
    return ids.map((id) => usersMap[id]);
});