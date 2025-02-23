import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GeneralLayoutComponent} from './Layout/general-layout/general-layout.component';

const routes: Routes = [
  {
    path: '',
    component: GeneralLayoutComponent,
    children: [
      {
        path: 'calendar',
        loadChildren: () => import('./calendar/calendar.module').then((m) => m.CalendarModule)
      },
      {
        path: '**',
        redirectTo: 'calendar',
      },
    ],

  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
