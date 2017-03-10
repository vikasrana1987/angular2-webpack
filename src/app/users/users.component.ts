import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

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
  public data;
  public filterQuery = '';
  public rowsOnPage = 10;
  public sortBy = 'email';
  public sortOrder = 'asc';

  users: User[] = [];
  totalUsers: number;
  currentUser: User;
  // tslint:disable-next-line:max-line-length
  constructor(private alertService: AlertService, private userService: UserService, private loaderService: LoaderService, private router: Router) {
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
                this.users = data;
                this.totalUsers = data.length;
            },
            error => {
                this.alertService.error(error);
                this.loaderService.displayLoader(false);
                if (error === 'Unauthorized') { this.router.navigateByUrl('/login'); }
            });
  }

}
