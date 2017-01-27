import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';

import { User } from '../_models/index';

declare var $: any;
@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, OnDestroy {
  bodyClasses: String = 'skin-blue sidebar-mini';
  currentUser: User;
  users: User[] = [];

  constructor() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
   }

  ngOnInit() {
    $('body').addClass(this.bodyClasses);
    console.log('Home Page');
  }
  ngOnDestroy() {
      $('body').removeClass(this.bodyClasses);
  }

}
