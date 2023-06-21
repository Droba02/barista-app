import { Inject, Injectable, Logger } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Cron, SchedulerRegistry } from "@nestjs/schedule";
import { SendResponseEvent } from "./send-response.event";
import { SuccessfulOrderEvent } from "./successful-order.event";

@Injectable()
export class BaristaService{

    constructor(private scheduleRegisty: SchedulerRegistry, @Inject('BARMEN') private barmen: ClientProxy){}
    private coffeeAmount = 300;
    private timePassed = 0;
    private isAvailable = true;
    private orderNumber= 0;

    @Cron('* * * * * *',{
        name : "making-coffee",
        disabled: true
    })
    makingCoffe(){
        Logger.log(`Barista number x making order number ${this.orderNumber}`)
        this.timePassed++;
    }

    makeOrder(order:{amount:number, time:number, orderNumber : number}){
        if(!this.isAvailable){
            this.barmen.emit('send-response', new SendResponseEvent(false))
            return false;
        }
        if((this.coffeeAmount-order.amount) < 0){
            this.refillCoffee()
            this.barmen.emit('send-response', new SendResponseEvent(false))
            return false;
        }
        
        
        Logger.log(`Barista x starting on order number: ${order.orderNumber}`)
        this.isAvailable = false;
        this.coffeeAmount -= order.amount
        this.orderNumber = order.orderNumber;
        const cronJob= this.scheduleRegisty.getCronJob('making-coffee');
        cronJob.start()

        setTimeout(()=>{
            cronJob.stop()
            
            this.isAvailable= true;
            Logger.log(`Finished order! Time passed : ${this.timePassed}; coffee left: ${this.coffeeAmount}`)
            this.timePassed = 0;
            this.barmen.emit('successful-order', new SuccessfulOrderEvent(this.orderNumber))
        },order.time*1000)
    }

    refillCoffee(){
        let timeBusy = 2 *10*1000;
        this.coffeeAmount = 300;
        this.isAvailable = false;

        Logger.log(`Barista number x is refilling coffee`)

        setTimeout(() =>{
            this.isAvailable = true;
            Logger.log(`Barista number x finished refilling coffee`)
        }, 
        timeBusy);

    }

    
}