import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { MathService } from './_math.service'; ⟵  remove this

@Module({
  imports: [],
  controllers: [AppController],
  //providers: [AppService, MathService],   ⟵  Change this
  providers: [AppService], //   ⟵  to this
})
export class AppModule {}
