import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { BaristaController } from "./barista.controller";
import { BaristaService } from "./barista.service";
import { ScheduleModule } from "@nestjs/schedule";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AppModule } from "src/app.module";
import { ConfigModule } from "@nestjs/config";


@Module({
    imports:[ ScheduleModule.forRoot(), AppModule],
    providers:[BaristaService],
    controllers:[BaristaController],
})
export class BaristaModule{
}