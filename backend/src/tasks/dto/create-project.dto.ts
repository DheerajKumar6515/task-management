import { IsString,IsNotEmpty,IsOptional } from "class-validator";


export class CreateprojectDto{

  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsOptional()
  priority?: string;

  @IsString()
  @IsOptional()
  lead?: string;

}