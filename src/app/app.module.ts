import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ng2-validation';
import { MetaModule, MetaConfig } from 'ng2-meta';

import { AppComponent } from './app.component';
import { AlertComponent } from './alert/index';

import { HeaderComponent } from './common/header/header.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';

import { ApiService } from './shared';

import { AuthGuard } from './_guards/index';
import { AlertService, AuthenticationService, UserService } from './_services/index';

import { routing } from './app.routing';

import { removeNgStyles, createNewHosts } from '@angularclass/hmr';
const metaConfig: MetaConfig = {
  useTitleSuffix: true,
  defaults: {
    title: 'Admin',
    titleSuffix: ' | Site Name',
    'og:image': '/img/favicon.ico',
  }
};

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    CustomFormsModule,
    NgbModule.forRoot(),
    MetaModule.forRoot(metaConfig),
    routing
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    HeaderComponent,
    SidebarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UsersComponent
  ],
  providers: [
    ApiService,
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {}
  hmrOnInit(store) {
    console.log('HMR store', store);
  }
  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
