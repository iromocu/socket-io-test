import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChannelGateway } from './channel/channel.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ChannelGateway],
})
export class AppModule {}
