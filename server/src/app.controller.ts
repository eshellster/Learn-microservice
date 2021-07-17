import { Controller, Logger } from '@nestjs/common';
// import { MessagePattern } from '@nestjs/microservices'; ⟵ Change this
import { GrpcMethod } from '@nestjs/microservices'; //     ⟵ to this
import { MathService } from './math.service';

interface INumberArray {
  data: number[]; //              ⟵ Add these
} //                              ⟵  two
//                                ⟵ interfaces
interface ISumOfNumberArray {
  sum: number;
}

@Controller()
export class AppController {
  private logger = new Logger('AppController');
  constructor(private mathService: MathService) {}

  // @MessagePattern('add')                       ⟵  Change this
  @GrpcMethod('AppController', 'Accumulate') //   ⟵  to this
  //
  // async accumulate(data: number[]) {                ⟵  Change method param type
  //   this.logger.log('Adding ' + data.toString());   ⟵  and return type to match
  //   return this.mathService.accumulate(data);       ⟵  .proto file
  // }                                                 ⟵
  accumulate(numberArray: INumberArray, metadata: any): ISumOfNumberArray {
    this.logger.log('Adding ' + numberArray.data.toString());
    return { sum: this.mathService.accumulate(numberArray.data) };
  }
}
