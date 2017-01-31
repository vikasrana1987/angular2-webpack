import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';

import { User } from '../_models/index';
import { AlertService,  UserService, LoaderService } from '../_services/index';

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

  constructor(private alertService: AlertService, private userService: UserService, private loaderService: LoaderService) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.loaderService.displayLoader(true);
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
                this.loaderService.displayLoader(false);
                console.log(data);
            },
            error => {
                this.loaderService.displayLoader(false);
                this.alertService.error(error);
            });
  }
}
