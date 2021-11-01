import { TaskStatus } from "../task.model";
import { IsEnum } from "class-validator";

export class UpdateTaskStatusDto{
    // @ts-ignore
    @IsEnum(TaskStatus)
    status: TaskStatus;
}