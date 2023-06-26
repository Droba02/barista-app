import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from "express";

@Injectable()
export class AppService {
  constructor(){

  }


  getHello(): string {
    return 'Hello World!';
  }

}
