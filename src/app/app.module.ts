import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { QuestionComponent } from './question/question.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { ChangeBgDirective } from './change-bg.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RouterModule } from '@angular/router';
//import { NgToastModule } from 'ng-angular-popup';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeDashboardComponent,
    WelcomeComponent,
    QuestionComponent,
    HeaderComponent,
    ChangeBgDirective,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
