import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(81, {
  cors: { origin: '*' },
})
export class BranchGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('branch_join')
  handleJoinBranch(client: Socket, room: string) {
    client.join(room);
  }
}
