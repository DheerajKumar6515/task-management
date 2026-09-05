import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateSubtaskDto } from './dto/create-subtask.dto';
import { UpdateSubtaskDto } from './dto/update-Subtask.dto';
import { CreatedColumnDto } from './dto/create-column.dto';
import { CreateprojectDto } from './dto/create-project.dto';
import { UpdateprojectDto } from './dto/update-project.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

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

  //for new project
  @Post('createproject')
  createnewproject(@Body() createprojectDto:CreateprojectDto){
    return this.tasksService.createnewproject(createprojectDto)
  }

  //update project
  @Patch('project/:id')
  updateproject(@Param('id') id:string, @Body() updateprojectDto:UpdateprojectDto){
    return this.tasksService.updateproject(id,updateprojectDto);
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

  //create comments
  @Post('comments')
  createComment(@Body() createCommentDto:CreateCommentDto){
    return this.tasksService.createComment(createCommentDto);
  }

  //fetch comments
  @Get('comment/:taskid')
  getCommentsByTaskId(@Param('taskid') taskid:string){
    return this.tasksService.getCommentsByTaskId(taskid);
  }

  //get all tasks
  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  //get all projects
  @Get('allproject')
  findAllProject(){
    return this.tasksService.findAllProject();
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

  //delete subtask
  @Delete('delsubtask/:id')
  removeSubtask(@Param('id') id:string){
    return this.tasksService.removeSubtask(id);
  }

  //delete column
  @Delete('/column/:id')
  removeColumn(@Param('id') id:string){
    return this.tasksService.removeColumn(id);
  }

  //delete project
  @Delete('delproject/:id')
  removeProject(@Param('id') id:string){
    return this.tasksService.removeProject(id);
  }


}
