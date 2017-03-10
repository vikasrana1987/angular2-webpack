// Angular Imports
import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// 3rd Party Imports
import { CustomFormsModule } from 'ng2-validation';
import { MetaModule, MetaConfig } from 'ng2-meta';
import { DataTableModule } from 'angular2-datatable';

// Project App Imports

import { AppComponent } from './app.component';
import { routing } from './app.routing';

// Project Component/Module Imports
import { AlertComponent } from './alert/index';
import { HeaderComponent } from './common/header/header.component';
import { SidebarComponent } from './common/sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { UsersEditComponent } from './users/users-edit.component';

// Project Service Imports
import { ApiService } from './shared';
import { AuthGuard } from './_guards/index';
import { StorageService, AlertService, AuthenticationService, UserService } from './_services/index';



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
    ReactiveFormsModule,
    DataTableModule,
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
    UsersComponent,
    UsersEditComponent
  ],
  providers: [
    ApiService,
    AuthGuard,
    StorageService,
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
