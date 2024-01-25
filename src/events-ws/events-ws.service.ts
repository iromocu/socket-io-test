import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { EventDto } from 'src/dtos/event-dto';
import { SchedulesAppointmens } from 'src/dtos/schedules-appointments.model';

@Injectable()
export class EventsWsService {
  private activeEvents: SchedulesAppointmens[] = [];

  registerEvents(client: Socket, event: EventDto) {
    this.removeEventsByIdClient(client.id);
    this.activeEvents.push({
      idUser: client.id,
      data: event,
      registerDate: new Date(),
    });
  }

  removeEventsByIdClient(idClient: string) {
    this.activeEvents = this.activeEvents.filter((e) => e.idUser != idClient);
  }

  getActiveEvents(): SchedulesAppointmens[] {
    this.validateEvents();
    return this.activeEvents;
  }

  validateEvents() {
    const dateValidate = this.addMinutes(new Date());
    this.activeEvents = this.activeEvents.filter(
      (e) => e.registerDate < dateValidate,
    );
  }

  addMinutes(date: Date): Date {
    date.setMinutes(date.getMinutes() + 10);
    return date;
  }
}
