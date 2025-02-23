import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CalendarComponent} from './calendar.component';
import {RouterModule, Routes} from '@angular/router';
import {CalendarTableComponent} from '../Shared/calendar-table/calendar-table.component';

const routes: Routes = [
  {
    path: "",
    component: CalendarComponent
  }
];

@NgModule({
  declarations: [
    CalendarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CalendarTableComponent,
  ],
  exports: []
})
export class CalendarModule {
}
