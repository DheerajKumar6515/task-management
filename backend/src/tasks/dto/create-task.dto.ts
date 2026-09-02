import {IsString,IsNotEmpty,IsOptional,IsArray,IsEnum } from "class-validator"

export enum TaskPriority{
    Low='low',
    MEDIUM='medium',
    HIGH='high'
}

export class CreateTaskDto {
   @IsString()
  @IsNotEmpty()
  column_id!: string;

  @IsString()
  @IsNotEmpty()
  user_id!:string;

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsNotEmpty()
  Column_title!: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsEnum(TaskPriority)
  @IsOptional()
  priority?: TaskPriority;

  @IsString()
  @IsOptional()
  assignee?: string;

  @IsString()
  @IsOptional()
  due_date?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @IsString()
  @IsOptional()
  description?: string;


}
