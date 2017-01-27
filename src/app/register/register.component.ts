import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { MetaService } from 'ng2-meta';
import { AlertService, UserService } from '../_services/index';

declare var $: any;
@Component({
  selector: 'my-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit, OnDestroy {
  public user;
  model: any = {};
  loading = false;

  submitted: boolean;
  bodyClasses: String = 'register-page';

  constructor(
    private metaService: MetaService,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService
    ) {
    // Do stuff
  }

  ngOnInit() {
    this.submitted = false;
    $('body').addClass(this.bodyClasses);
    console.log('Register Page');
    this.metaService.setTitle('Register page');
    this.metaService.setTag('og:image', '');
  }
  ngOnDestroy() {
      $('body').removeClass(this.bodyClasses);
  }
  onSubmit(isFormValid: boolean): void {
    this.submitted = true;
    if (isFormValid)  {
      this.loading = true;
      this.userService.create(this.model)
          .subscribe(
              data => {
                  this.user = data;
                  this.alertService.success('Registration successful', true);
                  this.router.navigate(['/login']);
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
    }
  }
}
