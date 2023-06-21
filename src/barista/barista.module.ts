import { Module } from "@nestjs/common";
import { BaristaController } from "./barista.controller";
import { BaristaService } from "./barista.service";
import { ScheduleModule } from "@nestjs/schedule";
import { ClientsModule, Transport } from "@nestjs/microservices";


@Module({
    imports:[ ScheduleModule.forRoot(),
        ClientsModule.register([
            {name : 'BARMEN',
            transport: Transport.TCP,
            options:{
                port:3001
            }}
          ])],
    providers:[BaristaService],
    controllers:[BaristaController],
})
export class BaristaModule{}