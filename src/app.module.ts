import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsWsModule } from './events-ws/events-ws.module';

@Module({
  imports: [EventsWsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
