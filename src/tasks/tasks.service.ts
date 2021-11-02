import {Injectable, NotFoundException} from '@nestjs/common';
import {TaskStatus} from "./task-status.enum";
import { v4 as uuid} from "uuid";
import {CreateTaskDto} from "./dto/create-task.dto";
import {GetTasksFilterDto} from "./dto/get-tasks-filter.dto";
import {TasksRepository} from "./tasks.repository";
import {InjectRepository} from "@nestjs/typeorm";
import {Task} from "./task.entity";

@Injectable()
export class TasksService {

    constructor(@InjectRepository(TasksRepository) private tasksRepository: TasksRepository){

    }


    getAllTasks(): Task[]{

    }

    async getTaskById(id: string): Promise<Task>{
        const found = await this.tasksRepository.findOne(id)
        if(!found){
            throw new NotFoundException(`Task with id ${id} not found`)
        }
        return found
    }


    async createTask(createTaskDto: CreateTaskDto): Promise<Task>{
        const { title, description } = createTaskDto;

        const task = this.tasksRepository.create({
            title,
            description,
            status: TaskStatus.OPEN
        })

        await this.tasksRepository.save(task);

        return task;
    }

    deleteTask(id: string): void {
        this.tasks = this.tasks.filter((task) => task.id !== id);
    }

    updateTask(id: string, status: TaskStatus){
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    }


    getTasksWithFilters(filterDto: GetTasksFilterDto): Task[]{
        const { status, search } = filterDto;


        let tasks = this.getAllTasks();

        // Do something with status

        if(status){
            tasks = tasks.filter((task) => task.status === status);
        }


        // Do something with search

        if(search){
            tasks = tasks.filter((task) => {
                if(task.title.includes(search) || task.description.includes(search)){
                    return true;
                }

                return false;
            })
        }

        // return final result

        return tasks
    }
}
