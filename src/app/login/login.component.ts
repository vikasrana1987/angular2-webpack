import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MetaService } from 'ng2-meta';

import { AlertService, AuthenticationService } from '../_services/index';

declare var $: any;

@Component({
  selector: 'my-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class LoginComponent implements OnInit, OnDestroy {
   public user;
   bodyClasses: String = 'login-page';
   submitted: boolean;
   model: any = {};
   loading = false;
   returnUrl: string;

   constructor(
        private metaService: MetaService,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

  ngOnInit() {
    this.submitted = false;
    $('body').addClass(this.bodyClasses);
    this.metaService.setTitle('Login page');
    this.metaService.setTag('og:image', '');
    // reset login status
    this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  ngOnDestroy() {
      $('body').removeClass(this.bodyClasses);
  }

  onSubmit(isFormValid: boolean): void {
    this.submitted = true;
    if (isFormValid)  {
     this.loading = true;
     this.authenticationService.login(this.model.username, this.model.password)
        .subscribe(
            data => {
                this.user = data;
                this.router.navigate([this.returnUrl]);
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
    }
  }
}
