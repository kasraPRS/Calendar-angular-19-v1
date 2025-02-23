import {ChangeDetectorRef, Component, ElementRef, TemplateRef, ViewChild, ViewChildren} from '@angular/core';
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
  CdkDragDrop, CdkDragMove,
  CdkDragStart, CdkDropList,
  CdkDropListGroup,
  DragDropModule,
  moveItemInArray
} from '@angular/cdk/drag-drop';
import {DayModel} from '../../Models/DayModel';
import {MatDialog} from '@angular/material/dialog';
import {EventsDTO} from '../../Models/EventModel';
import {CreateEventService} from '../../Utilities Services/create-event.service';
import {AddEventComponent} from '../add-event/add-event.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {DayNamesEnum} from '../../enum/day-names.enum';
import {WeekModelDto} from '../../Models/WeekModelDto.dto';
import {MatListModule} from '@angular/material/list';
import {MatChipTrailingIcon} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
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
    MatChipTrailingIcon,
    MatIconModule,
    MatCardModule
  ],
  templateUrl: './calendar-table.component.html',
  styleUrl: './calendar-table.component.scss'
})
export class CalendarTableComponent {
  displayedColumnsForMount: string[] = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  dataSource: DayModel[] = [];
  weekModelDto: WeekModelDto = {}
  dataSourceMonth: DayModel[] = [];
  timeArray: string[] = [];
  today = new Date();
  selectCalenderType: MenuTypeEnum = MenuTypeEnum.WEEK;
  events: EventsDTO[] = [];
  dayNames = Object.keys(DayNamesEnum)
  dayModel: DayModel = {};
  selectedEvent: { startX: number, startY: number, width: number, height: number } | null = null;


  constructor(
    private _calendarAssignmentService: CalendarDateAssignmentService,
    public dialog: MatDialog,
    private cd: ChangeDetectorRef,
    private _createEvent: CreateEventService
  ) {
    this.setTimeForCalendar();
    this.initCalendarByWeek();
  }


  initCalendarByWeek() {
    this._calendarAssignmentService.generateWeekCalendar(new Date().getFullYear(), new Date().getMonth())
      .pipe().subscribe(
      dataSource => {
        this.dataSource = [...dataSource];
        this.filterByCurrentWeek();
        this.formatDataForTable(this.dataSource, this.timeArray);
        this.createDataTableModel(this.dataSource);
        let weekModel: WeekModelDto = {
          'SUNDAY': this.dataSource.filter(day => day.dayName === DayNamesEnum.SUNDAY),
          'MONDAY': this.dataSource.filter(day => day.dayName === DayNamesEnum.MONDAY),
          'TUESDAY': this.dataSource.filter(day => day.dayName === DayNamesEnum.TUESDAY),
          'WEDNESDAY': this.dataSource.filter(day => day.dayName === DayNamesEnum.WEDNESDAY),
          'THURSDAY': this.dataSource.filter(day => day.dayName === DayNamesEnum.THURSDAY),
          'FRIDAY': this.dataSource.filter(day => day.dayName === DayNamesEnum.FRIDAY),
          'SATURDAY': this.dataSource.filter(day => day.dayName === DayNamesEnum.SATURDAY)
        }
        this.weekModelDto = weekModel;
      }
    );

  }


  createDataTableModel(data: DayModel[]) {

    this.dataSource.filter(day => day.dayName === 'SUNDAY')
    switch (DayNamesEnum) {

    }
  }


  formatDataForTable(dates: any[], times: string[]): any[] {
    let formattedData: any[] = [];

    // times.forEach(el => {
    //   dates.forEach((entry) => {
    //     const dateObj = new Date(entry.date); // تبدیل رشته تاریخ به Date
    //     formattedData.push({
    //       date: dateObj,
    //       dayName: entry.dayName,
    //       weekId: entry.weekId,
    //       time: el
    //     })
    //   });
    // })

    dates.forEach((entry) => {
      const dateObj = new Date(entry.date); // تبدیل رشته تاریخ به Date
      times.forEach((time) => {
        formattedData.push({
          date: dateObj,
          dayName: entry.dayName,
          weekId: entry.weekId,
          time: time
        });
      });
    });
    this.dataSource = formattedData;
    return this.dataSource
  }

  filterByCurrentWeek() {
    const now = new Date();

    // Set the start of the week to Sunday (reset hours, minutes, and seconds)
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0); // Reset time to start of the day

    // Set the end of the week to Saturday
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999); // End of the day

    // Filter dataSource based on the week range
    this.dataSource = this.dataSource.filter(day => {
      if (!day?.date) return false; // Ensure date exists
      const dayDate = new Date(day.date); // Convert to Date object if needed
      return dayDate >= startOfWeek && dayDate <= endOfWeek;
    });
  }

  setTimeForCalendar() {
    const now = new Date();
    const endTime = new Date();
    endTime.setHours(23, 0, 0, 0); // Set to 11:00 PM
    let currentTime = new Date(); // Clone the current date
    currentTime.setHours(0, 0, 0)


    while (currentTime <= endTime) {
      const hours = currentTime.getHours().toString().padStart(2, '0'); // Ensure 2 digits
      const minutes = currentTime.getMinutes().toString().padStart(2, '0');
      this.timeArray.push(`${hours}:${minutes}`); // Push time as HH:mm
      currentTime.setMinutes(currentTime.getMinutes() + 60); // Increment by 30 minutes
    }
  }

  initCalendarByMount() {
    this._calendarAssignmentService.generateWeekCalendar(new Date().getFullYear(), new Date().getMonth())
      .pipe().subscribe(
      dataSourceMonth => {
        this.dataSourceMonth = [...dataSourceMonth];
      }
    );
  }


  setActiveDay(dayName: string, today: Date): boolean {
    return this.dayNames[today.getDay()] === dayName
  }

  addEvent(element: any, selectedRowTime: string[] = []) {
    this.dialog.open(AddEventComponent, {
      minWidth: '500px',
      data: {...element},
    }).afterClosed().subscribe((event: EventsDTO) => {
      if (event) {
        this.events = [...this.events, structuredClone(event)];
        // this.dayModel = {...element, events: this.events};

        // this.createModel(this.dayModel, this.dataSource, this.events);

        this.cd.detectChanges();
      }
      // console.log(this.dataSource)
      debugger;
    });
  }


  createModel(day: DayModel, dataSource: DayModel[], event: EventsDTO[]) {
    // this._createEvent.createModel(day, dataSource, event);
  }


  showWeekView(status: MenuTypeEnum) {
    this.selectCalenderType = status;
    if (status === MenuTypeEnum.MOUNT) {
      this.initCalendarByMount();
    }
  }

  drop(event: CdkDragDrop<unknown>) {
    moveItemInArray(this.weekModelDto?.SUNDAY!, event.previousIndex, event.currentIndex);
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


}
