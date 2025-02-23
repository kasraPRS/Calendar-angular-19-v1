import {Injectable} from '@angular/core';
import {DayModel} from '../Models/DayModel';
import {DayNamesEnum} from '../enum/day-names.enum';
import {DataTransferService} from "./data-transfer.service";
import {EventsDTO} from "../Models/EventModel";

@Injectable({
  providedIn: 'root'
})
export class CalendarDateAssignmentService {
  weeks:DayModel[] = []
  timeArray: string[] = [];
  dayNames = Object.keys(DayNamesEnum)

  constructor(
      private _dataTransfer:DataTransferService
  ) {
  }

  generateWeekCalendar(year: number, month: number) {
    const startOfMonth = new Date(year, month, 1);  // The first day of the month
    const endOfMonth = new Date(year, month + 1, 0); // Last day of the month
    let weekId = 0;
    let currentDate = this.getStartOfWeek(startOfMonth); // Start from the first Sunday or beginning of the week
    while (startOfMonth <= endOfMonth) {  // use <= to include the last day of the month
      this.setTimeForCalendar();
      this.dayNames.forEach((day) => {
        switch (day) {
          case "SATURDAY":
            this.weeks.push(this.createDayModelDTO(currentDate, DayNamesEnum.SATURDAY, weekId, this.timeArray));
            break;
          case "SUNDAY":
            this.weeks.push(this.createDayModelDTO(currentDate, DayNamesEnum.SUNDAY, weekId, this.timeArray));
            break;
          case "MONDAY":
            this.weeks.push(this.createDayModelDTO(currentDate, DayNamesEnum.MONDAY, weekId, this.timeArray));
            break;
          case "TUESDAY":
            this.weeks.push(this.createDayModelDTO(currentDate, DayNamesEnum.TUESDAY, weekId, this.timeArray));
            break;
          case "WEDNESDAY":
            this.weeks.push(this.createDayModelDTO(currentDate, DayNamesEnum.WEDNESDAY, weekId, this.timeArray));
            break;
          case "THURSDAY":
            this.weeks.push(this.createDayModelDTO(currentDate, DayNamesEnum.THURSDAY, weekId, this.timeArray));
            break;
          case "FRIDAY":
            this.weeks.push(this.createDayModelDTO(currentDate, DayNamesEnum.FRIDAY, weekId, this.timeArray));
            break;
        }
      });
      weekId++;
      this._dataTransfer.setWeekData(this.weeks);
    }
  }

  setTimeForCalendar():string[] {
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
    return this.timeArray;
  }
  createDayModelDTO(currentDate: Date, dayName: DayNamesEnum, weekId: number, time: string[]): DayModel {
    const dayOfWeek = currentDate.getDay();
    let dayModel: DayModel = {weekId: weekId, date: currentDate, dayName: dayName, time: time, events:[]};

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

