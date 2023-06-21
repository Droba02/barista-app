import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { BaristaModule } from './barista/barista.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    BaristaModule,{
      transport: Transport.TCP,
    }
  )
  app.listen()
}
bootstrap();
