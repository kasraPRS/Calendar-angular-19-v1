import {Component, EventEmitter, Output} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MenuTypeEnum} from '../../enum/menu-type.enum';

@Component({
  selector: 'dst-menu',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  @Output() selectCalendarType = new EventEmitter<MenuTypeEnum>();
  Status = MenuTypeEnum;

  showWeekView(status: MenuTypeEnum) {
    this.selectCalendarType.emit(status);
  }
}
