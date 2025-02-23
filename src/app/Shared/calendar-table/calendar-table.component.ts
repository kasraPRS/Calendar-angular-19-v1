import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import {CalendarDateAssignmentService} from '../../Utilities Services/calendar-date-assignment.service';
import {DateFormatPipe} from '../Pipes/convert-date.pipe';
import {CommonModule} from '@angular/common';
import {MatBadgeModule} from '@angular/material/badge';
import {DialogModule} from '@angular/cdk/dialog';
import {MenuComponent} from '../menu/menu.component';
import {MenuTypeEnum} from '../../enum/menu-type.enum';
import {
    CdkDrag,
    CdkDragDrop,
    CdkDragPlaceholder,
    CdkDropList, DragDropModule,
    moveItemInArray,
} from '@angular/cdk/drag-drop';
import {DayModel} from '../../Models/DayModel';
import {MatDialog} from '@angular/material/dialog';
import {EventsDTO} from '../../Models/EventModel';
import {AddEventComponent} from '../add-event/add-event.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {DayNamesEnum} from '../../enum/day-names.enum';
import {WeekModelDto} from '../../Models/WeekModelDto.dto';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {DataTransferService} from "../../Utilities Services/data-transfer.service";
import {Subscription} from "rxjs";
import {WeekService} from "../../Utilities Services/week.service";
import {WeekDTO} from "../../Models/weekDto";
import {OverlayModule} from "@angular/cdk/overlay";

@Component({
    selector: 'dst-calendar-table',
    standalone: true,
    imports: [
        MatTableModule,
        DateFormatPipe,
        CommonModule,
        MatBadgeModule,
        DialogModule,
        MenuComponent,
        DragDropModule,
        MatGridListModule,
        MatListModule,
        MatIconModule,
        MatCardModule,
        CdkDropList,
        CdkDrag,
        OverlayModule,
        CdkDropList, CdkDrag, CdkDragPlaceholder
    ],
    templateUrl: './calendar-table.component.html',
    styleUrl: './calendar-table.component.scss'
})
export class CalendarTableComponent implements OnInit, OnDestroy {
    dataSource: DayModel[] = [];
    weekModelDto: WeekModelDto;
    weekDto: WeekDTO = {days: []};
    dataSourceMonth: DayModel[] = [];
    timeArray: string[] = [];
    today = new Date();
    selectCalenderType: MenuTypeEnum = MenuTypeEnum.WEEK;
    events: EventsDTO[] = [];
    dayNames = Object.keys(DayNamesEnum)
    subscription: Subscription[] = [];
    isOpen = false;

    constructor(
        private _calendarAssignmentService: CalendarDateAssignmentService,
        public dialog: MatDialog,
        private cd: ChangeDetectorRef,
        private _dataTransfer: DataTransferService,
        private _weekService: WeekService
    ) {
        this._calendarAssignmentService.generateWeekCalendar(new Date().getFullYear(), new Date().getMonth())
        this.timeArray = this._calendarAssignmentService.setTimeForCalendar();
        this.weekModelDto = this._calendarAssignmentService.createCalendarWeekDtoModel();
    }

    ngOnInit() {
        this._weekService.getWeek().subscribe(
            (updateWeek) => {
                if (updateWeek) {
                    this.weekDto = updateWeek
                    console.log('week Dto', this.weekDto)
                    this.weekModelDto = this._calendarAssignmentService.createCalendarWeekDtoModel();
                    console.log('week model', this.weekModelDto)
                }
            }
        )
    }

    initCalendarByWeek() {
        // this.weekModelDto = this._calendarAssignmentService.createCalendarWeekDtoModel();
        // console.log(this.weekModelDto)
    }


    initCalendarByMount() {
        this.dataSourceMonth = this._calendarAssignmentService.generateWeekCalendar(new Date().getFullYear(), new Date().getMonth())
    }


    setActiveDay(dayName: string, today: Date): boolean {
        return this.dayNames[today.getDay()] === dayName
    }

    addEvent(element: any) {
        this.subscription.push(
            this.dialog.open(AddEventComponent, {
                minWidth: '500px',
                data: {...element},
            }).afterClosed().subscribe((event: EventsDTO) => {
                if (event) {
                    this._weekService.addOrUpdateEvent(event);
                    this.cd.detectChanges();
                }
            })
        )
    }


    showWeekView(status: MenuTypeEnum) {
        this.selectCalenderType = status;
        if (status === MenuTypeEnum.MOUNT) {
            this.initCalendarByMount();
        }
    }

    drop(event: CdkDragDrop<string[]>) {
        moveItemInArray(this.weekModelDto?.SUNDAY?.hours!, event.previousIndex, event.currentIndex);
    }

    /**
     * Predicate function that only allows even numbers to be
     * sorted into even indices and odd numbers at odd indices.
     */
    sortPredicate(index: number, item: CdkDrag<number>) {
        return (index + 1) % 2 === item.data % 2;
    }


    // drop(event: CdkDragDrop<any[]>, targetDay: any) {
    //   console.log(event)
    //   if (event.previousContainer === event.container) {
    //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    //   } else {
    //     const movedEvent = event.previousContainer.data[event.previousIndex];
    //     movedEvent.date = targetDay.date; // بروزرسانی تاریخ ایونت
    //     transferArrayItem(
    //       event.previousContainer.data,
    //       event.container.data,
    //       event.previousIndex,
    //       event.currentIndex
    //     );
    //   }
    // }

    ngOnDestroy() {
        this.subscription.forEach(el => el.unsubscribe());
    }
}
