import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'dst-general-layout',
  standalone: true,
  imports: [
    RouterModule,
  ],
  templateUrl: './general-layout.component.html',
  styleUrl: './general-layout.component.scss'
})
export class GeneralLayoutComponent {
}
