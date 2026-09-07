import { Injectable } from '@nestjs/common';
import { error } from 'console';

@Injectable()
export class AppService {
  getHello(): object {
    return {
      activeStatus:"true",
      message:"deploy backend successfully.",
      error:false
    };
  }
}

