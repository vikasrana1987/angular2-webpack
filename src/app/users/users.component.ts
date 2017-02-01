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
  public rows: Array<any> = [];
  public columns: Array<any> = [
    {title: 'First Name', name: 'firstName', filtering: {filterString: '', placeholder: 'Filter by first name'}},
    {title: 'Last Name', name: 'lastName', filtering: {filterString: '', placeholder: 'Filter by first name'}}
  ];
  page = 1;
  itemsPerPage = 10;
  maxSize = 5;
  numPages = 1;
  length = 0;

  public config: any = {
    paging: true,
    sorting: {columns: this.columns},
    filtering: {filterString: ''},
    className: ['table', 'table-hover', 'table-bordered']
  };
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
                this.onChangeTable(this.config);
            },
            error => {
                this.alertService.error(error);
                this.loaderService.displayLoader(false);
                if (error === 'Unauthorized') { this.router.navigateByUrl('/login'); }
            });
  }
  public changePage(page: any, data: Array<any> = this.users): Array<any> {
    let start = (page.page - 1) * page.itemsPerPage;
    let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
    return data.slice(start, end);
  }

  public changeSort(data: any, config: any): any {
    if (!config.sorting) {
      return data;
    }

    let columns = this.config.sorting.columns || [];
    let columnName: string = void 0;
    let sort: string = void 0;

    for (let i = 0; i < columns.length; i++) {
      if (columns[i].sort !== '' && columns[i].sort !== false) {
        columnName = columns[i].name;
        sort = columns[i].sort;
      }
    }

    if (!columnName) {
      return data;
    }

    // simple sorting
    return data.sort((previous: any, current: any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  public changeFilter(data: any, config: any): any {
    let filteredData: Array<any> = data;
    this.columns.forEach((column: any) => {
      if (column.filtering) {
        filteredData = filteredData.filter((item: any) => {
          return item[column.name].match(new RegExp(column.filtering.filterString, 'ig'));
        });
      }
    });

    if (!config.filtering) {
      return filteredData;
    }

    if (config.filtering.columnName) {
      return filteredData.filter((item: any) =>
      item[config.filtering.columnName].match(new RegExp(this.config.filtering.filterString, 'ig')));
    }

    let tempArray: Array<any> = [];
    filteredData.forEach((item: any) => {
      let flag = false;
      this.columns.forEach((column: any) => {
        if (item[column.name].toString().match(new RegExp(this.config.filtering.filterString, 'ig'))) {
          flag = true;
        }
      });
      if (flag) {
        tempArray.push(item);
      }
    });
    filteredData = tempArray;
    return filteredData;
  }

  public onChangeTable(config: any, page: any = {page: this.page, itemsPerPage: this.itemsPerPage}): any {
    if (config.filtering) {
      Object.assign(this.config.filtering, config.filtering);
    }

    if (config.sorting) {
      Object.assign(this.config.sorting, config.sorting);
    }
    let filteredData = this.changeFilter(this.users, this.config);
    let sortedData = this.changeSort(filteredData, this.config);
    this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
    this.totalUsers = sortedData.length;
  }

  public onCellClick(data: any): any {
    console.log(data);
  }
}
