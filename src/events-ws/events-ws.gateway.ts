import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { EventsWsService } from './events-ws.service';
import { Server, Socket } from 'socket.io';
import { EventDto } from 'src/dtos/event-dto';

@WebSocketGateway({ cors: true, namespace: 'events-rm' })
export class EventsWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() wss: Server;

  constructor(private readonly eventsWsService: EventsWsService) {}

  handleConnection(client: Socket) {
    console.log('new client: ', client.id);
    this.wss.emit('new-client', this.eventsWsService.getActiveEvents());
  }

  handleDisconnect(client: Socket) {
    this.eventsWsService.removeEventsByIdClient(client.id);
    this.wss.emit('new-client', this.eventsWsService.getActiveEvents());
  }

  @SubscribeMessage('new-event')
  handleNewEventByClient(client: Socket, payload: EventDto) {
    this.eventsWsService.registerEvents(client, payload);
    this.wss.emit('new-event-mg', this.eventsWsService.getActiveEvents());
  }
}
