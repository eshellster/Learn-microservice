import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { join } from 'path'; // ⟵ Add this

// Create a logger instance

// Create the microservice options object
const microserviceOptions = {
  //transport: Transport.REDIS,   ⟵ Change this
  transport: Transport.GRPC, //   ⟵ to this
  options: {
    //url: 'redis://127.0.0.1:6379',                 ⟵ remove this
    package: 'app', //                               ⟵ add this
    protoPath: join(__dirname, '../src/app.proto'), // ⟵ & this
  },
};

async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    AppModule,
    microserviceOptions,
  );
  app.listen();
}
bootstrap();
