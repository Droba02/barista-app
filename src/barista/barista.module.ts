import { Module } from "@nestjs/common";
import { BaristaController } from "./barista.controller";
import { BaristaService } from "./barista.service";


@Module({
    providers:[BaristaService],
    controllers:[BaristaController],
})
export class BaristaModule{}