import {EventsDTO} from './EventModel';

export interface DayModel {
  weekId?: number;
  month?:number;
  date?: string;
  dayName?: string;
  events?: EventsDTO[];
}
