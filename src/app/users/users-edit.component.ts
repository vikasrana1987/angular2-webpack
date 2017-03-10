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
  submitted: boolean;
  private sub: any;
  // tslint:disable-next-line:max-line-length
  constructor(private alertService: AlertService,
    private userService: UserService,
    private loaderService: LoaderService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.submitted = false;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.loaderService.displayLoader(true);

    this.user = this.formBuilder.group({
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'username': ['', Validators.required],
      'email': ['', Validators.required],
    });
  }

  ngOnInit() {
    $('body').addClass(this.bodyClasses);
    // subscribe to router event
    this.sub = this.activatedRoute.params.subscribe((params: Params) => {
      let userId = params['id'];
      this.getUserById(userId);
    });

  }

  ngOnDestroy() {
    $('body').removeClass(this.bodyClasses);
    this.sub.unsubscribe();
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
            username: this.userData.username,
            email: this.userData.email
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

  onSubmit(isFormValid: boolean, user: User): void {
    this.submitted = true;
    if (isFormValid) {
      this.loading = true;
      console.log(user);
    }
  }
}
