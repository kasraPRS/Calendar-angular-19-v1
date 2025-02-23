import {Injectable} from '@angular/core';
import {DayModel} from '../Models/DayModel';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateEventService {
  dataSource = new BehaviorSubject<DayModel[]>([]);
  day: DayModel = {};
  dayModel: DayModel = {};

  constructor() {
  }

  createModel(day:DayModel){
    this.dayModel = day;
    this.dataSource.next(this.dataSource.value?.map(day =>
      day.date === this.dayModel.date ? { ...day } : day
    ))
  }

}
