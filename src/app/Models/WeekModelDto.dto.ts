
import {EventsDTO} from "./EventModel";
import {DayModelDto} from "./DayModelDto.dto";

export class WeekModelDto {
    SUNDAY?: { hours: DayModelDto[], events: EventsDTO[] };
    MONDAY?: { hours: DayModelDto[], events: EventsDTO[] };
    TUESDAY?: { hours: DayModelDto[], events: EventsDTO[] };
    WEDNESDAY?: { hours: DayModelDto[], events: EventsDTO[] };
    THURSDAY?: { hours: DayModelDto[], events: EventsDTO[] };
    FRIDAY?: { hours: DayModelDto[], events: EventsDTO[] };
    SATURDAY?: { hours: DayModelDto[], events: EventsDTO[] };
}
