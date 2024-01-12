import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(81, {
  cors: {
    origin: '*',
  },
  namespace: 'RM-Events',
})
export class ChannelGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  afterInit(server: any) {
    console.log('Servidor iniciado');
  }
  handleConnection(client: any, ...args: any[]) {
    console.log('Alguien se conecto al socket');
  }
  handleDisconnect(client: any) {
    console.log('Alguien se DESCONECTO al socket');
  }

  @SubscribeMessage('events')
  handleEvent(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
    console.log(client.client);
    this.server.emit('new_event', data);
  }
}
