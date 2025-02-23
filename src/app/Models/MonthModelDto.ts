import {DayModel} from './DayModel';

export class MonthModelDto {
  firstWeek?:DayModel[] = [];
  secondWeek?:DayModel[] = [];
  thirdWeek?:DayModel[] = [];
  fourthWeek?:DayModel[] = [];
}
