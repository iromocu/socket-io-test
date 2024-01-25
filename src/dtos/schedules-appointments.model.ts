import { EventDto } from './event-dto';

export interface SchedulesAppointmens {
  idUser: string;
  data: EventDto;
  registerDate: Date;
}
