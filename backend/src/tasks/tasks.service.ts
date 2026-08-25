import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { supabase } from '../supabase.client';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { from } from 'rxjs';
import { title } from 'process';
import { randomUUID } from 'crypto';
import { CreateSubtaskDto } from './dto/create-subtask.dto';
import { UpdateSubtaskDto } from './dto/update-Subtask.dto';
import { CreatedColumnDto } from './dto/create-column.dto';

@Injectable()
export class TasksService {

  async createColumn(createdColumnDto:CreatedColumnDto){
     const columnPayload={
      id:createdColumnDto.column_id,
      title:createdColumnDto.columnName
    };

      const { data, error } = await supabase
      .from('columns')
      .insert(columnPayload)
      .select();

       if (error) {
      throw new BadRequestException(`Column creation failed: ${error.message}`);
    }

    return data;
  }

  async create(createTaskDto:CreateTaskDto) {
    //Ensure Column exists
    const columnPayload={
      id:createTaskDto.column_id,
      title:createTaskDto.Column_title
    };

    const { error: columnError } = await supabase
      .from('columns')
      .upsert([columnPayload], { onConflict: 'id' });

    if (columnError) {
      throw new BadRequestException(`Column setup failed: ${columnError.message}`);
    }

    //Insert Task linked to column
      const taskId = `task-${randomUUID().slice(0, 8)}`; // Generating unique task ID (task-1, etc.)
    const taskPayload = {
      id: taskId,
      column_id: createTaskDto.column_id, // foreign key link
      title: createTaskDto.title,
      status: createTaskDto.status,
      priority: createTaskDto.priority,
      assignee: createTaskDto.assignee,
      due_date: createTaskDto.due_date,
      tags: createTaskDto.tags,
      description: createTaskDto.description
    };

    const { data: taskData, error: taskError } = await supabase
      .from('tasks')
      .insert([taskPayload])
      .select();

    if (taskError) {
      throw new BadRequestException(`Task creation failed: ${taskError.message}`);
    }

    return taskData[0];
    
  }
 
  async createSubtask(taskId:string,createdSubtaskDto:CreateSubtaskDto){
    // 1. check parent task exist or not
    const { data: parentTask, error: taskCheckError } = await supabase
      .from('tasks')
      .select('id')
      .eq('id', taskId)
      .single();

      if (taskCheckError || !parentTask) {
      throw new NotFoundException(`Parent Task with ID "${taskId}" not found`);
    }

    // 2. Subtask Payload prepare karein
    const subtaskId = `subtask-${randomUUID().slice(0, 8)}`;
    const payload = {
      id: subtaskId,
      task_id: taskId, // Foreign key linking to parent task
      ...createdSubtaskDto,
    };

    // 3. Subtasks table me insert karein
    const { data, error } = await supabase
      .from('subtasks')
      .insert([payload])
      .select();

    if (error) {
      throw new BadRequestException(error.message);
    }

    return data[0];
  }

  async updateSubtask(id:string,updateSubtaskDto:UpdateSubtaskDto){

    const {data,error}=await supabase.from('subtasks').update(updateSubtaskDto).eq('id',id).select();

    if (error) {
      throw new BadRequestException(error.message);
    }

    if (!data || data.length === 0) {
      throw new NotFoundException(`subTask with ID "${id}" not found`);
    }

    return data[0];

  }
 
async findAll() {
   const {data,error}=await supabase.
   from('columns').select(`
    id,
        title,
        tasks (
          id,
          title,
          status,
          priority,
          assignee,
          dueDate:due_date,
          tags,
          description,
          subtasks (
            id,
            title,
            priority,
            assignee,
            dueDate:due_date
          )
        )
    `)

    if(error){
      throw new Error(error.message);
    }
    return data
  }

async findOne(id: string) {
    const {data,error}=await supabase.from('tasks').
    select(`
      id,
        column_id,
        title,
        status,
        priority,
        assignee,
        dueDate:due_date,
        tags,
        description,
        subtasks (
          id,
          title,
          priority,
          assignee,
          dueDate:due_date
        )
    `).eq('id', id)
      .single();

      if (error || !data) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return data;
    
  }

 async update(id: string, updateTaskDto: UpdateTaskDto) {
     const {data,error} = await supabase.from('tasks').update(updateTaskDto).
     eq('id',id).select();
    
     if (error) {
      throw new BadRequestException(error.message);
    }

    if (!data || data.length === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return data[0];

  }

 async remove(id: string) {
    const {data,error} = await supabase.from('tasks').delete().eq('id',id).select();

    if (error) {
      throw new BadRequestException(error.message);
    }

    if (!data || data.length === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return {
      message: `Task with ID "${id}" successfully deleted`,
      deletedTask: data[0],
    };
  }

  //remove column
async removeColumn(id:string){
   const {data,error} = await supabase.from('columns').delete().eq('id',id).select();

    if (error) {
      throw new BadRequestException(error.message);
    }

    if (!data || data.length === 0) {
      throw new NotFoundException(`Column with ID "${id}" not found`);
    }

    return {
      message: `Column with ID "${id}" successfully deleted`,
      deletedTask: data[0],
    };
}

}
