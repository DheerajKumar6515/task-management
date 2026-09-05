import { IsNotEmpty, IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  task_id!: string; 

  @IsString()
  @IsNotEmpty()
  content!: string; 

  @IsString()
  @IsOptional()
  user_name?: string; 

  @IsUUID()
  @IsOptional()
  user_id?: string; 

  @IsUUID()
  @IsOptional()
  parent_id?: string;
}