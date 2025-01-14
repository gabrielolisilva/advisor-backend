import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth(): { msg: string; code: string } {
    return {
      msg: 'Server is running correctly',
      code: 'AS8',
    };
  }
}
