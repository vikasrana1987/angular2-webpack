import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';

import { User } from '../_models/index';
import { AlertService,  UserService } from '../_services/index';

declare var $: any;
@Component({
  selector: 'my-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsersComponent implements OnInit, OnDestroy {
  bodyClasses: String = 'skin-blue sidebar-mini';
  currentUser: User;
  users: User[] = [];

  constructor(private alertService: AlertService, private userService: UserService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
    $('body').addClass(this.bodyClasses);
    this.getUsers();
  }
  ngOnDestroy() {
      $('body').removeClass(this.bodyClasses);
  }
  getUsers() {
    this.userService.getAll()
        .subscribe(
            data => {
                console.log(data);
            },
            error => {
                this.alertService.error(error);
            });
  }
}
