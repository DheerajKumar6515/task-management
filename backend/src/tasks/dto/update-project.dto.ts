import { PartialType } from "@nestjs/mapped-types";
import { CreateprojectDto } from "./create-project.dto";

export class UpdateprojectDto extends PartialType(CreateprojectDto){}