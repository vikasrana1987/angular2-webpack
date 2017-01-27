import { Component } from '@angular/core';

import { ApiService } from './shared';
import { AuthenticationService } from './_services/index';

import '../style/app.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'ionicons/dist/css/ionicons.min.css';
import '../public/css/AdminLTE.min.css';
import '../public/css/skins/_all-skins.min.css';

@Component({
  selector: 'my-app', // <my-app></my-app>
  templateUrl: './app.component.html',
  styleUrls: [
      './app.component.scss',
    ],
})
export class AppComponent {
  title: string;
  constructor(private api: ApiService, private auth: AuthenticationService) {
    this.title = this.api.title;
    this.auth = this.auth;
  }
}
