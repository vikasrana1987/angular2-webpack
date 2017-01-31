import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../_services/index';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class AuthGuard implements CanActivate {
    route: any;
    constructor(private auth: AuthenticationService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.auth.loggedIn()) {
            // logged in so return true
            // this.router.navigate(['']);
            return Observable.of(true);
        }
        this.route = route;
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return Observable.of(false);
    }
}
