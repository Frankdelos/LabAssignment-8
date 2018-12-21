import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import {ToastModule } from './toast/toast.module';
import { AppRoutes } from './app.routes';
import {FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ToastModule,
    AppRoutes,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
