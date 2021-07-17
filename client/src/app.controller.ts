import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
// import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { IGrpcService } from './grpc.interface';
import { microserviceOptions } from './grpc.options';
// import { MathService } from './_math.service';

@Controller()
export class AppController {
  // Create a logger instance
  private logger = new Logger('Appcontroller');

  @Client(microserviceOptions) //         ⟵ Add
  private client: ClientGrpc; //          ⟵ this
  private grpcService: IGrpcService; //   ⟵ & this

  constructor(
    private readonly appService: AppService, // private mathService: MathService,        ⟵ remove this
  ) {}

  onModuleInit() {
    this.grpcService = this.client.getService<IGrpcService>('AppController'); //  ⟵ Add this
  } //                                                                            ⟵

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('add')
  async accumulate(@Body('data') data: number[]) {
    this.logger.log('Adding ' + data.toString());
    // return this.mathService.accumulate({ data });   ⟵  Change this
    return this.grpcService.accumulate({ data }); //   ⟵  to this
    // data를 객체로 변경한 것을 기억해야한다.
  }
}
