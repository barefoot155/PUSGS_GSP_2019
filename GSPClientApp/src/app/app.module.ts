import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { RegistrationComponent } from './Components/registration/registration.component';
import { HttpService } from './Services/http.service';
import { LoginServiceService } from './Services/login-service.service';
import { RegisterServiceService } from 'src/app/Services/register-service.service';
import { ScheduleComponent } from './Components/schedule/schedule.component';
import { ScheduleServiceService } from 'src/app/Services/schedule-service.service';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { PricesComponent } from './Components/prices/prices.component';
import { PricelistServiceService } from 'src/app/Services/pricelist-service.service';
import { UserDetailsComponent } from './Components/user-details/user-details.component';
import { TicketsComponent } from './Components/tickets/tickets.component';
import { TicketsServiceService } from 'src/app/Services/tickets-service.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    ScheduleComponent,
    NavbarComponent,
    PricesComponent,
    UserDetailsComponent,
    TicketsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [HttpService, LoginServiceService, RegisterServiceService, ScheduleServiceService, PricelistServiceService, TicketsServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
