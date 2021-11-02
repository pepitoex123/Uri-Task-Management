import {Body, Controller, Delete, Get, Param, Post, Patch, Query} from '@nestjs/common';
import {TasksService} from "./tasks.service";
import {TaskStatus} from "./task-status.enum";
import {CreateTaskDto} from "./dto/create-task.dto"
import {GetTasksFilterDto} from "./dto/get-tasks-filter.dto";
import {UpdateTaskStatusDto} from "./dto/update-task-status.dto";
import {Task} from "./task.entity";

@Controller('tasks')
export class TasksController {

    constructor(private tasksService: TasksService) {
    }

    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDto): Task[]{
        if(Object.keys(filterDto).length){
            return this.tasksService.getTasksWithFilters(filterDto);
        }else{
            return this.tasksService.getAllTasks();
        }

    }



    @Get("/:id")
    async getTaskById(@Param("id") id: string): Promise<Task>{
        return await this.tasksService.getTaskById(id);
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task>{
        return this.tasksService.createTask(createTaskDto);
    }

    @Delete("/:id")
    deleteTask(@Param("id") id: string): void {
        return this.tasksService.deleteTask(id);
    }

    @Patch("/:id/status")
    updateTaskStatus(@Param("id") id: string, @Body() updateTaskStatusDto: UpdateTaskStatusDto): Task{
        const { status } = updateTaskStatusDto;
        return this.tasksService.updateTask(id,status);
    }
}
