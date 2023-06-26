import { Inject, Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { ClientProxy, NestMicroservice } from "@nestjs/microservices";
import { Cron, SchedulerRegistry } from "@nestjs/schedule";
import { SendResponseEvent } from "./send-response.event";
import { SuccessfulOrderEvent } from "./successful-order.event";



@Injectable()
export class BaristaService{
   
    constructor(private scheduleRegisty: SchedulerRegistry){}
    private coffeeAmount = 300;
    private timePassed = 0;
    private orderNumber= 0;
    private baristaNumer: number;

    @Cron('* * * * * *',{
        name : "making-coffee",
        disabled: true
    })
    makingCoffe(){
        Logger.log(`Barista number ${this.baristaNumer} making order number ${this.orderNumber}`)
        this.timePassed++;
    }

    makeOrder(order:{amount:number, time:number, orderNumber : number}){
        this.baristaNumer = 1;
        if((this.coffeeAmount-order.amount) < 0){
            this.refillCoffee()
            return 'reffiling';
        }
        
        
        Logger.log(`Barista ${this.baristaNumer} starting on order number: ${order.orderNumber}`)
        this.coffeeAmount -= order.amount
        this.orderNumber = order.orderNumber;
        const cronJob= this.scheduleRegisty.getCronJob('making-coffee');
        cronJob.start()

        setTimeout(()=>{
            cronJob.stop()
            Logger.log(`Finished order! Time passed : ${this.timePassed}; coffee left: ${this.coffeeAmount}`)
            this.timePassed = 0;
        },order.time*1000)
    }

    refillCoffee(){
        let timeBusy = 2 *10*1000;
        this.coffeeAmount = 300;

        Logger.log(`Barista number ${this.baristaNumer} is refilling coffee`)

        setTimeout(() =>{
            Logger.log(`Barista number ${this.baristaNumer} finished refilling coffee`)
        }, 
        timeBusy);

    }
    
}