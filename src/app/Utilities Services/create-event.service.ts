// noinspection BadExpressionStatementJS

import {Injectable, OnDestroy} from '@angular/core';
import {DayModel} from '../Models/DayModel';
import {BehaviorSubject, Subscription} from 'rxjs';
import {DataTransferService} from "./data-transfer.service";
import {EventsDTO} from "../Models/EventModel";

@Injectable({
    providedIn: 'root'
})
export class CreateEventService implements OnDestroy {
    dataSource = new BehaviorSubject<DayModel[]>([]);
    day: DayModel = {};
    weeks: DayModel[] = [];
    subscription: Subscription[] = []

    constructor(
        private _dataTransfer: DataTransferService
    ) {
    }

    createModel(event: EventsDTO) {
        this.day = {};
        this.subscription.push(
            this._dataTransfer.weeks.subscribe(
                days => {
                    this.weeks = days;
                }
            )
        )
        this.day = this.weeks.filter(day => day?.date?.getTime() === event.date?.getTime())[0];
        console.log(this.day)

        // if(this.day?.events){
        //     this.day.events?.push(event);
        // }



    }

    ngOnDestroy() {
        this.subscription.forEach(el => el.unsubscribe());
    }
}
