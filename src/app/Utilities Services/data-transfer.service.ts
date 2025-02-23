import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {DayModel} from "../Models/DayModel";
import {EventsDTO} from "../Models/EventModel";
import {WeekModelDto} from "../Models/WeekModelDto.dto";

@Injectable({
    providedIn: 'root'
})
export class DataTransferService {
    weeks = new BehaviorSubject<DayModel[]>([]);
    weekDto = new BehaviorSubject<WeekModelDto>({});
    events = new BehaviorSubject<EventsDTO[]>([]);

    constructor() {
    }

    setWeekData(week: DayModel[]) {
        this.weeks.next(week)
    }

    setWeekDto(week: WeekModelDto) {
        this.weekDto.next(week);
    }

    setEventData(event: EventsDTO[]) {
        this.events.next(event);
    }
}
