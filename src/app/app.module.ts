import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { ContactusComponent } from './contactus/contactus.component';
import { LoginComponent } from './login/login.component';
// reactive forms
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS}from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { HttpinterceptorService } from './httpinterceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactusComponent,
    LoginComponent,
    SignupComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass:HttpinterceptorService,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
