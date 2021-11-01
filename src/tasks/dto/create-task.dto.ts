import { isNotEmpty } from "class-validator";


export class CreateTaskDto {
    // @ts-ignore
    @isNotEmpty()
    title: string;

    // @ts-ignore
    @isNotEmpty()
    description: string;
}


