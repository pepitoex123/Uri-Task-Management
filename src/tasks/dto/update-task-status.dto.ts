import { TaskStatus } from "../task.model";
import { isEnum } from "class-validator";

export class UpdateTaskStatusDto{
    // @ts-ignore
    @isEnum(TaskStatus)
    status: TaskStatus;
}