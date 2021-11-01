import { TaskStatus } from "../task-status.enum";
import { IsEnum } from "class-validator";

export class UpdateTaskStatusDto{
    // @ts-ignore
    @IsEnum(TaskStatus)
    status: TaskStatus;
}