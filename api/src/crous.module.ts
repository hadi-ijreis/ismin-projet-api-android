import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CrousController } from './crous.controller';
import { CrousService } from './crous.service';

@Module({
  imports: [HttpModule],
  controllers: [CrousController],
  providers: [CrousService],
})
export class CrousModule {}
