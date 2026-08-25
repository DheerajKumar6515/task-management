import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { TaskPriority } from './create-task.dto';

export class CreateSubtaskDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsEnum(TaskPriority)
  @IsOptional()
  priority?: TaskPriority;

  @IsString()
  @IsOptional()
  assignee?: string;

  @IsString()
  @IsOptional()
  due_date?: string;
}