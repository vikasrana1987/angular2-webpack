import {
  Component,
  OnInit,
  OnDestroy,
  ViewEncapsulation
} from '@angular/core';

import {
  FormGroup,
  Validators,
  FormBuilder
}
from '@angular/forms';

import {
  Router,
  ActivatedRoute,
  Params
} from '@angular/router';

import {
  User
} from '../_models/index';

import {
  AlertService,
  UserService,
  LoaderService
} from '../_services/index';

declare let $: any;
@Component({
  selector: 'my-users',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UsersEditComponent implements OnInit, OnDestroy {
  bodyClasses: String = 'skin-blue sidebar-mini';
  user: FormGroup;
  loading = false;
  userData: any;
  currentUser: User;

  // tslint:disable-next-line:max-line-length
  constructor(private alertService: AlertService,
    private userService: UserService,
    private loaderService: LoaderService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.loaderService.displayLoader(true);

    this.user = this.formBuilder.group({
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required]
    });
  }

  ngOnInit() {
    $('body').addClass(this.bodyClasses);
    // subscribe to router event
    this.activatedRoute.params.subscribe((params: Params) => {
      let userId = params['id'];
      this.getUserById(userId);
    });

  }

  ngOnDestroy() {
    $('body').removeClass(this.bodyClasses);
  }

  getUserById(userId) {
    this.userService.getUserById(userId)
      .subscribe(
        data => {
          this.loaderService.displayLoader(false);
          this.userData = data;
          this.user.patchValue({
            firstName: this.userData.firstName,
            lastName: this.userData.lastName,
          });
        },
        error => {
          this.alertService.error(error);
          this.loaderService.displayLoader(false);
          if (error === 'Unauthorized') {
            this.router.navigateByUrl('/login');
          }
        });
  }

  onSubmit(): void {
    /*if (isFormValid) {
      this.loading = true;
      console.log(this);
    }*/
  }
}
