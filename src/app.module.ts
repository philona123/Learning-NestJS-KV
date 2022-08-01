import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { join } from 'path';
import { AuthService } from './auth/auth.service';
import { createUsersLoader } from './tasks/tasks.loader';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      inject: [AuthService],
      imports: [AuthModule],
      useFactory: (authService: AuthService) => ({
        context: () => ({
          randomValue: Math.random(),
          usersLoader: createUsersLoader(authService),

        }),
        typePaths: ['./**/*.graphql'],
        definitions: {
          path: join(process.cwd(), 'src/graphql.ts'),
          outputAs: 'class',
        },
        debug: true,
        playground: true,

      }),
    }),
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'myapp',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,],
})
export class AppModule { }
