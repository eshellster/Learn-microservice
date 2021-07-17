import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

// Same options object used by microservice server
export const microserviceOptions: ClientOptions = {
  //transport: Transport.REDIS,   ⟵ Change this
  transport: Transport.GRPC, //   ⟵ to this
  options: {
    //url: 'redis://127.0.0.1:6379',                 ⟵ remove this
    package: 'app', //                               ⟵ add this
    protoPath: join(__dirname, '../src/app.proto'), // ⟵ & this
  },
};
