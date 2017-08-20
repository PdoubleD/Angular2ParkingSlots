//Root Module
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule, MdDialogModule } from '@angular/material';

import { FlexLayoutModule } from "@angular/flex-layout";


// Services
import { AuthService } from "./services/auth.service";
import { Talk2DBService } from './services/talk2-db.service';
import { UserDetailsService } from './services/user-details.service';

import 'hammerjs';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookParkingComponent } from './book-parking/book-parking.component';
import { ViewBookingsComponent } from './view-bookings/view-bookings.component'
import { AlertBoxComponent } from './alert-box/alert-box.component';
import { RoutingModule } from './app-routing.module';
import { FooterComponent } from './footer/footer.component';

import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    FooterComponent,
    DashboardComponent,
    BookParkingComponent,
    ViewBookingsComponent,
    AlertBoxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MdDialogModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    RoutingModule
  ],
  exports: [
  ],
  entryComponents: [ 
    AlertBoxComponent
  ],
  providers: [AuthService, UserDetailsService, MdDialogModule, Talk2DBService],
  bootstrap: [AppComponent]
})
export class AppModule { }
