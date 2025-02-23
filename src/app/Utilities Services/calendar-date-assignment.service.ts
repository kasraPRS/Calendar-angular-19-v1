import {Injectable} from '@angular/core';
import {DayModel} from '../Models/DayModel';
import {DayNamesEnum} from '../enum/day-names.enum';
import {BehaviorSubject, Observable} from 'rxjs';
import {MonthModelDto} from '../Models/MonthModelDto';

@Injectable({
  providedIn: 'root'
})
export class CalendarDateAssignmentService {
  weeks = new BehaviorSubject<DayModel[]>([]);
  timeArray: string[] = [];
  dayNames = Object.keys(DayNamesEnum)
  mount = new BehaviorSubject<MonthModelDto>({});

  constructor() {
  }

  generateWeekCalendar(year: number, month: number): Observable<DayModel[]> {
    const startOfMonth = new Date(year, month, 1);  // The first day of the month
    const endOfMonth = new Date(year, month + 1, 0); // Last day of the month
    let weekId = 0;

    let currentDate = this.getStartOfWeek(startOfMonth); // Start from the first Sunday or beginning of the week
    while (startOfMonth <= endOfMonth) {  // use <= to include the last day of the month
      this.dayNames.forEach((day) => {
        switch (day) {
          case "SATURDAY":
            this.weeks.value.push(this.createDayModelDTO(currentDate, DayNamesEnum.SATURDAY, weekId, this.timeArray));
            break;
          case "SUNDAY":
            this.weeks.value.push(this.createDayModelDTO(currentDate, DayNamesEnum.SUNDAY, weekId, this.timeArray));
            break;
          case "MONDAY":
            this.weeks.value.push(this.createDayModelDTO(currentDate, DayNamesEnum.MONDAY, weekId, this.timeArray));
            break;
          case "TUESDAY":
            this.weeks.value.push(this.createDayModelDTO(currentDate, DayNamesEnum.TUESDAY, weekId, this.timeArray));
            break;
          case "WEDNESDAY":
            this.weeks.value.push(this.createDayModelDTO(currentDate, DayNamesEnum.WEDNESDAY, weekId, this.timeArray));
            break;
          case "THURSDAY":
            this.weeks.value.push(this.createDayModelDTO(currentDate, DayNamesEnum.THURSDAY, weekId, this.timeArray));
            break;
          case "FRIDAY":
            this.weeks.value.push(this.createDayModelDTO(currentDate, DayNamesEnum.FRIDAY, weekId, this.timeArray));
            break;
        }
      });
      weekId++;
    }

    // const mount = {
    //   firstWeek:this.weeks?.value.filter(week => week.weekId === 0),
    //   secondWeek : this.weeks?.value.filter(week => week.weekId === 1),
    //   thirdWeek : this.weeks?.value.filter(week => week.weekId === 2),
    //   fourthWeek : this.weeks?.value.filter(week => week.weekId === 3)
    // }
    // this.mount.next(mount)
    return this.weeks;
  }


  createDayModelDTO(currentDate: Date, dayName: DayNamesEnum, weekId: number, time: string[]): DayModel {
    const dayOfWeek = currentDate.getDay();
    let dayModel: DayModel = {weekId: weekId, date: currentDate, dayName: dayName, time: time};

    if (dayOfWeek !== this.getDayIndex(dayName)) {
      dayModel.date = new Date(currentDate);
    }
    currentDate.setDate(currentDate.getDate() + 1);

    return dayModel;

  }




  getDayIndex(dayName: DayNamesEnum): number {
    switch (dayName) {
      case DayNamesEnum.SATURDAY:
        return 0;
      case DayNamesEnum.SUNDAY:
        return 1;
      case DayNamesEnum.MONDAY:
        return 2;
      case DayNamesEnum.THURSDAY:
        return 3;
      case DayNamesEnum.WEDNESDAY:
        return 4;
      case DayNamesEnum.TUESDAY:
        return 5;
      case DayNamesEnum.FRIDAY:
        return 6;
      default:
        return -1; // Return -1 for invalid input
    }
  }


  getStartOfWeek(date: Date): Date {

    const day = date.getDay(); // Get the current day (0-6)
    const diff = day - new Date(date.getDate()).getDay(); // Calculate the difference from Sunday
    const startOfWeek = date;
    startOfWeek.setDate(diff); // Set the start date to the previous Sunday
    return startOfWeek;
  }
}

