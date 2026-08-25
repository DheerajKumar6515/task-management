import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateSubtaskDto } from './dto/create-subtask.dto';
import { UpdateSubtaskDto } from './dto/update-Subtask.dto';
import { CreatedColumnDto } from './dto/create-column.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  //new column for new task
  @Post('column')
   createColumn(@Body() createdColumnDto:CreatedColumnDto){
     return this.tasksService.createColumn(createdColumnDto)
   }

  //for new task
  @Post('create')
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  //for new subtask
  @Post(':id/subtasks')
  createSubtask(
    @Param('id') taskId: string,
    @Body() createSubtaskDto: CreateSubtaskDto,
  ) {
    return this.tasksService.createSubtask(taskId, createSubtaskDto);
  }

  //update subtask
  @Patch('subtask/:id')
  updateSubtask(@Param('id') id:string, @Body() updateSubtaskDto:UpdateSubtaskDto){
    return this.tasksService.updateSubtask(id,updateSubtaskDto);
  }

  //get all tasks
  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  //get one task
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  //update task
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }
  
  //delete task
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }

  //delete column
  @Delete('/column/:id')
  removeColumn(@Param('id') id:string){
    return this.tasksService.removeColumn(id);
  }
}
