import { Controller, Get, Req } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { MakeOrderEvent } from "./make-order.event";
import { BaristaService } from "./barista.service";
import { Request } from "express";
import {
    MessagePattern,
    RmqContext,
    Ctx,
    Payload
  } from '@nestjs/microservices';

@Controller()
export class BaristaController{
    constructor(private baristaService : BaristaService){}
  
    @MessagePattern('table-order')
    makeOrder(@Payload() data: MakeOrderEvent,
    @Ctx() context: RmqContext){ 
        const channel = context.getChannelRef();
        const message = context.getMessage();

        this.baristaService.makeOrder(data.orderObj);

        setTimeout(()=>{
            channel.ack(message)
        }, data.orderObj.time * 1000);
    }
}