import { Component } from '@angular/core';
import { RoleID } from 'src/app/models/RoleID';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  role!: RoleID;
}

