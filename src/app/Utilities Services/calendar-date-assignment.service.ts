import {Injectable} from '@angular/core';
import {DayModel} from '../Models/DayModel';
import {DayNamesEnum} from '../enum/day-names.enum';
import {DataTransferService} from "./data-transfer.service";
import {WeekModelDto} from "../Models/WeekModelDto.dto";
import {EventsDTO} from "../Models/EventModel";
import {DayModelDto} from "../Models/DayModelDto.dto";

@Injectable({
    providedIn: 'root'
})
export class CalendarDateAssignmentService {
    weeks: DayModel[] = [];
    weeksDto: DayModelDto[] = []
    timeArray: string[] = [];
    dayNames = Object.keys(DayNamesEnum)
    weekModelDto: WeekModelDto = {}
    events: EventsDTO[] = [];

    constructor(
        private _dataTransfer: DataTransferService
    ) {
    }

    generateWeekCalendar(year: number, month: number): DayModel[] {
        this.weeks = [];
        const startOfMonth = new Date(year, month, 1);  // The first day of the month
        const endOfMonth = new Date(year, month + 1, 0); // Last day of the month
        let weekId = 0;
        let currentDate = this.getStartOfWeek(startOfMonth); // Start from the first Sunday or beginning of the week
        while (startOfMonth < endOfMonth) {  // use <= to include the last day of the month
            this.dayNames.forEach((day) => {
                switch (day) {
                    case "SATURDAY":
                        this.weeks.push(this.createDayModelDTO(currentDate, DayNamesEnum.SATURDAY, weekId));
                        break;
                    case "SUNDAY":
                        this.weeks.push(this.createDayModelDTO(currentDate, DayNamesEnum.SUNDAY, weekId));
                        break;
                    case "MONDAY":
                        this.weeks.push(this.createDayModelDTO(currentDate, DayNamesEnum.MONDAY, weekId));
                        break;
                    case "TUESDAY":
                        this.weeks.push(this.createDayModelDTO(currentDate, DayNamesEnum.TUESDAY, weekId));
                        break;
                    case "WEDNESDAY":
                        this.weeks.push(this.createDayModelDTO(currentDate, DayNamesEnum.WEDNESDAY, weekId));
                        break;
                    case "THURSDAY":
                        this.weeks.push(this.createDayModelDTO(currentDate, DayNamesEnum.THURSDAY, weekId));
                        break;
                    case "FRIDAY":
                        this.weeks.push(this.createDayModelDTO(currentDate, DayNamesEnum.FRIDAY, weekId));
                        break;
                }
            });
            weekId++;
        }
        this._dataTransfer.setWeekData(this.weeks);
        return this.weeks;
    }


    createCalendarWeekDtoModel(): WeekModelDto {
        this._dataTransfer.events.subscribe(
            event => {
                this.events = event;
            }
        )
        this._dataTransfer.weeks.subscribe(
            (week) => {
                this.weeks = week;
                this.filterByCurrentWeek();
                this.formatDataForTable();

                let weekModel: WeekModelDto = {

                    'SUNDAY': {
                        hours: this.weeks.filter(day => day.dayName === DayNamesEnum.SUNDAY),
                    },
                    'MONDAY': {
                        hours: this.weeks.filter(day => day.dayName === DayNamesEnum.MONDAY),
                    },
                    'TUESDAY': {
                        hours: this.weeks.filter(day => day.dayName === DayNamesEnum.TUESDAY),
                    },
                    'WEDNESDAY': {
                        hours: this.weeks.filter(day => day.dayName === DayNamesEnum.WEDNESDAY),
                    },
                    'THURSDAY': {
                        hours: this.weeks.filter(day => day.dayName === DayNamesEnum.THURSDAY),
                    },
                    'FRIDAY': {
                        hours: this.weeks.filter(day => day.dayName === DayNamesEnum.FRIDAY),
                    },
                    'SATURDAY': {
                        hours: this.weeks.filter(day => day.dayName === DayNamesEnum.SATURDAY),
                    },
                }
                this.weekModelDto = weekModel;
            }
        )
        return this.weekModelDto;
    }

    filterEvents(date: Date): EventsDTO[] {
        console.log(this.events)
        return this.events
    }

    filterByCurrentWeek() {
        const now = new Date();
        const startOfWeek = now;
        startOfWeek.setDate(now.getDate() - now.getDay());
        startOfWeek.setHours(0, 0, 0, 0);

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999);

        this.weeks = this.weeks.filter(day => {
            if (!day?.date) return false;
            const dayDate = new Date(day.date);
            return dayDate >= startOfWeek && dayDate <= endOfWeek;
        });
    }

    formatDataForTable(): DayModelDto[] {
        let formattedData: any[] = [];
        this.weeks.forEach((entry) => {
            const dateObj = entry.date;
            this.timeArray.forEach((time) => {
                formattedData.push({
                    date: dateObj,
                    dayName: entry.dayName,
                    weekId: entry.weekId,
                    time: time,
                });
            });
        });
        this.weeks = formattedData;
        return this.weeks
    }

    setTimeForCalendar(): string[] {
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

    createDayModelDTO(currentDate: Date, dayName: DayNamesEnum, weekId: number): DayModelDto {
        const dayOfWeek = currentDate.getDay();
        let dayModelDto: DayModelDto = {
            weekId: weekId,
            month: currentDate.getMonth(),
            date: currentDate.toString(),
            dayName: dayName
        };

        if (dayOfWeek !== this.getDayIndex(dayName)) {
            // dayModelDto.date = new Date(currentDate);
        }
        currentDate.setDate(currentDate.getDate() + 1);
        return dayModelDto;

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

