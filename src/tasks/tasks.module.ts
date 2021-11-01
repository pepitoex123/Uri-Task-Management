import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import {TasksRepository} from "./tasks.repository";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  controllers: [TasksController],
  providers: [TasksService],
  imports: [TypeOrmModule.forFeature([TasksRepository])]
})
export class TasksModule {}
