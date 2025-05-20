import { Component } from '@angular/core';
import { RoutesEnum } from '../../../../routes/routes.enum';
import { NavItemComponent } from './nav-item/nav-item.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  imports: [NavItemComponent],
})
export class NavbarComponent {
  public routesEnum = RoutesEnum;
}
