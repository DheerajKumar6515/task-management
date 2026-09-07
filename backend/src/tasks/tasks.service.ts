import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { supabase } from '../supabase.client';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { randomUUID } from 'crypto';
import { CreateSubtaskDto } from './dto/create-subtask.dto';
import { UpdateSubtaskDto } from './dto/update-Subtask.dto';
import { CreatedColumnDto } from './dto/create-column.dto';
import { CreateprojectDto } from './dto/create-project.dto';
import { UpdateprojectDto } from './dto/update-project.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class TasksService {
  //create new column for tasks
  async createColumn(createdColumnDto: CreatedColumnDto) {
    const columnPayload = {
      id: createdColumnDto.column_id,
      title: createdColumnDto.columnName,
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

  //create new  task
  async create(createTaskDto: CreateTaskDto) {
    //Ensure Column exists
    const columnPayload = {
      id: createTaskDto.column_id,
      title: createTaskDto.Column_title,
    };

    const { error: columnError } = await supabase
      .from('columns')
      .upsert([columnPayload], { onConflict: 'id' });

    if (columnError) {
      throw new BadRequestException(
        `Column setup failed: ${columnError.message}`,
      );
    }

    //Insert Task linked to column
    const taskId = `task-${randomUUID().slice(0, 8)}`; // Generating unique task ID (task-1, etc.)
    const taskPayload = {
      id: taskId,
      column_id: createTaskDto.column_id, 
      title: createTaskDto.title,
      status: createTaskDto.status,
      priority: createTaskDto.priority,
      assignee: createTaskDto.assignee,
      due_date: createTaskDto.due_date,
      tags: createTaskDto.tags,
      description: createTaskDto.description,
      user_id: createTaskDto.user_id,
      avatar:createTaskDto.avatar,
    };

    const { data: taskData, error: taskError } = await supabase
      .from('tasks')
      .insert([taskPayload])
      .select();

    if (taskError) {
      throw new BadRequestException(
        `Task creation failed: ${taskError.message}`,
      );
    }

    return taskData[0];
  }

  //create new project
  async createnewproject(createprojectDto: CreateprojectDto) {
    const projectId = randomUUID().slice(0, 8);
    const projectPayload = {
      id: projectId,
      title: createprojectDto.title,
      priority: createprojectDto.priority,
      lead: createprojectDto.lead,
    };

    const { data: projectData, error: projectError } = await supabase
      .from('projects')
      .insert([projectPayload])
      .select();

    if (projectError) {
      throw new BadRequestException(
        `Project creation failed: ${projectError.message}`,
      );
    }

    return projectData[0];
  }

  //create Subtask
  async createSubtask(taskId: string, createdSubtaskDto: CreateSubtaskDto) {
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

  //create comments
  async createComment(createCommentDto:CreateCommentDto){

     const commentPayload = {
       task_id:createCommentDto.task_id,
        content:createCommentDto.content,
        user_id:createCommentDto.user_id || null,
        user_name:createCommentDto.user_name || 'Guest',
        parent_id:createCommentDto.parent_id || null,
        avatar:createCommentDto.avatar || null
    };

    const { data, error } = await supabase
      .from('comments')
      .insert([commentPayload])
      .select();

    if (error) {
      throw new BadRequestException(
        `Failed to create comment: ${error.message}`,
      );
    }

    return data[0];
  }

  //update Subtask
  async updateSubtask(id: string, updateSubtaskDto: UpdateSubtaskDto) {
    const { data, error } = await supabase
      .from('subtasks')
      .update(updateSubtaskDto)
      .eq('id', id)
      .select();

    if (error) {
      throw new BadRequestException(error.message);
    }

    if (!data || data.length === 0) {
      throw new NotFoundException(`subTask with ID "${id}" not found`);
    }

    return data[0];
  }

  //update project
  async updateproject(id: string, updateprojectDto: UpdateprojectDto) {
    const { data, error } = await supabase
      .from('projects')
      .update(updateprojectDto)
      .eq('id', id)
      .select();

    if (error) {
      throw new BadRequestException(error.message);
    }

    if (!data || data.length === 0) {
      throw new NotFoundException(`Project with ID "${id}" not found`);
    }

    return data[0];
  }

  //Update / Upsert User Profile
  async UpdateProfile (userId:string,updateProfileDto:UpdateProfileDto){

    const { data, error } = await supabase
      .from('profiles')
      .upsert(
        {
          id:userId,
          name: updateProfileDto.name,
          email: updateProfileDto.email,
          title: updateProfileDto.title,
          username: updateProfileDto.username,
          avatar: updateProfileDto.avatar,
        },
        { onConflict: 'id' },
      )
      .select()
      .single();

    if (error) {
      throw new BadRequestException(`Failed to update profile: ${error.message}`);
    }

    return {
      message: 'Profile updated successfully',
      data,
    };

  }

  //Profile Fetch Function 
  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, name, email, title, username, avatar')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      throw new BadRequestException(`Error fetching profile: ${error.message}`);
    }

    if (!data) {
      throw new NotFoundException('Profile not found');
    }

    return data;
  }

  //get all tasks
  async findAll() {
    const { data, error } = await supabase.from('columns').select(`
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
          avatar,
          description,
          subtasks (
            id,
            title,
            priority,
            assignee,
            dueDate:due_date
          )
        )
    `);

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  //get all project
  async findAllProject(){

    const query = `
      SELECT id, title, priority, lead, created_at 
      FROM projects 
      ORDER BY created_at DESC;
    `;

      const { data, error } = await supabase.from('projects').select('id, title, priority, lead').order('created_at', { ascending: false });

       if (error) {
      throw new Error(error.message);
    }
    return data;
  }

  //get one task by id
  async findOne(id: string) {
    const { data, error } = await supabase
      .from('tasks')
      .select(
        `
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
    `,
      )
      .eq('id', id)
      .single();

    if (error || !data) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return data;
  }

  //get comments
  async getCommentsByTaskId(taskid:string){
     
    if(!taskid){
       throw new BadRequestException(
        `Failed to fetch comments. TaskId required!`,
      );
    }

     const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('task_id', taskid)
      .order('created_at', { ascending: true });

    if (error) {
      throw new BadRequestException(
        `Failed to fetch comments: ${error.message}`,
      );
    }

    return data || [];
  }

  //update task
  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const { data, error } = await supabase
      .from('tasks')
      .update(updateTaskDto)
      .eq('id', id)
      .select();

    if (error) {
      throw new BadRequestException(error.message);
    }

    if (!data || data.length === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return data[0];
  }

  //remove task
  async remove(id: string) {
    const { data, error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id)
      .select();

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

  //remove subtask
  async removeSubtask(id:string){
     const { data, error } = await supabase
      .from('subtasks')
      .delete()
      .eq('id', id)
      .select();

    if (error) {
      throw new BadRequestException(error.message);
    }

    if (!data || data.length === 0) {
      throw new NotFoundException(`SubTask with ID "${id}" not found`);
    }

    return {
      message: `SubTask with ID "${id}" successfully deleted`,
      deletedTask: data[0],
    };
  }

  //remove column
  async removeColumn(id: string) {
    const { data, error } = await supabase
      .from('columns')
      .delete()
      .eq('id', id)
      .select();

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

  //remove project
  async removeProject(id:string){
    const { data, error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)
      .select();

    if (error) {
      throw new BadRequestException(error.message);
    }

    if (!data || data.length === 0) {
      throw new NotFoundException(`Project with ID "${id}" not found`);
    }

    return {
      message: `Project with ID "${id}" successfully deleted`,
      deletedTask: data[0],
    };
  }
}
