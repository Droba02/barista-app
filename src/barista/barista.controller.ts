import { Controller, Get, Req } from "@nestjs/common";
import { EventPattern } from "@nestjs/microservices";
import { MakeOrderEvent } from "./make-order.event";
import { BaristaService } from "./barista.service";
import { Request } from "express";

@Controller()
export class BaristaController{
    constructor(private baristaServis : BaristaService){}
    @EventPattern('make-order')
    makeOrder(data : MakeOrderEvent){
        this.baristaServis.makeOrder(data.orderObj );
    }

    
}