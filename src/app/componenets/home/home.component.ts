import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  tabIndex : Tabs = Tabs.Categories;
}
enum Tabs{
  Categories = 0,
  favorites = 1
}
