import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { BaristaModule } from './barista/barista.module';

async function bootstrap() {
  const app1 = await NestFactory.createMicroservice<MicroserviceOptions>(
    BaristaModule,{
      transport: Transport.TCP,
      options:{
        port: 3002
      }
    }
  )
  const app2 = await NestFactory.createMicroservice<MicroserviceOptions>(
    BaristaModule,{
      transport: Transport.TCP,
      options:{
        port: 3003
      }
    }
  )
  const app3 = await NestFactory.createMicroservice<MicroserviceOptions>(
    BaristaModule,{
      transport: Transport.TCP,
      options:{
        port: 3004
      }
    }
  )
  app1.listen()
  app2.listen()
  app3.listen()
}
bootstrap();
