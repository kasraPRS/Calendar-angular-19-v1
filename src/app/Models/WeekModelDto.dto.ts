
import {EventsDTO} from "./EventModel";
import {DayModelDto} from "./DayModelDto.dto";

export class WeekModelDto {
    SUNDAY?: { hours: DayModelDto[] };
    MONDAY?: { hours: DayModelDto[] };
    TUESDAY?: { hours: DayModelDto[] };
    WEDNESDAY?: { hours: DayModelDto[] };
    THURSDAY?: { hours: DayModelDto[] };
    FRIDAY?: { hours: DayModelDto[] };
    SATURDAY?: { hours: DayModelDto[] };
}
