import {EventsDTO} from './EventModel';
import {DayNamesEnum} from '../enum/day-names.enum';

export class DayModel {
  weekId?: number;
  date?: Date;
  dayName?: DayNamesEnum;
  time?:string[] = [];
  events?: EventsDTO[] = [];
}
