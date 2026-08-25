import { IsString,IsNotEmpty } from "class-validator";

export class CreatedColumnDto{

  @IsString()
  @IsNotEmpty()
  column_id!: string;

  @IsString()
  @IsNotEmpty()
  columnName!: string;
}