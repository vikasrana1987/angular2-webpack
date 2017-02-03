import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';

import { AuthGuard } from './_guards/index';

const routes: Routes = [
  {
    path: 'dashboard',
    component: HomeComponent,
    data: {
      meta: {
        title: 'Home page',
        description: 'Description of the home page'
      }
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    component: UsersComponent,
    data: {
      meta: {
        title: 'Manage Users',
        description: 'Manage Users'
      }
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
     data: {
      meta: {
        title: 'Login page',
        description: 'Description of the login page'
      }
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      meta: {
        title: 'Register page',
        description: 'Description of the register page'
      }
    }
  },
  { path: '**', redirectTo: 'dashboard'}
];

export const routing = RouterModule.forRoot(routes);
