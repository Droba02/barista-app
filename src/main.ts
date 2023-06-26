import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { BaristaModule } from './barista/barista.module';

async function bootstrap() {
  const app1 = await NestFactory.createMicroservice(BaristaModule, {
    transport: Transport.RMQ,
    options: {
      urls: [
        'amqp://localhost:5672'
      ],
      queue: 'orders_queue',
      noAck: false,
      prefetchCount: 1
    }
  });
   app1.listen();
   
   const app2 = await NestFactory.createMicroservice(BaristaModule, {
    transport: Transport.RMQ,
    options: {
      urls: [
        'amqp://localhost:5672'
      ],
      queue: 'orders_queue',
      noAck: false,
      prefetchCount: 1
    }
  });
   app2.listen();

   const app3 = await NestFactory.createMicroservice(BaristaModule, {
    transport: Transport.RMQ,
    options: {
      urls: [
        'amqp://localhost:5672'
      ],
      queue: 'orders_queue',
      noAck: false,
      prefetchCount: 1
    }
  });
   app3.listen();

}
bootstrap();
