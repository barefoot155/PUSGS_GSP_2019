import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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
import { ChangePasswordComponent } from './Components/change-password/change-password.component';
import { PasswordChangeServiceService } from 'src/app/Services/password-change-service.service';
import { TokenInterceptor } from 'src/app/Interceptors/token.interceptor';
import { HttpErrorInterceptor } from 'src/app/Interceptors/http-error.interceptor';
import { VerificationsComponent } from './Components/verifications/verifications.component';
import { UserServiceService } from 'src/app/Services/user-service.service';
import { PricelistComponent } from './Components/pricelist/pricelist.component';
import { UpdatePricelistComponent } from './Components/update-pricelist/update-pricelist.component';
import { TicketValidationComponent } from './Components/ticket-validation/ticket-validation.component';
import { EditLinesComponent } from './Components/edit-lines/edit-lines.component';
import { CheckTicketComponent } from './Components/check-ticket/check-ticket.component';
import { UpdateSchedulesComponent } from './Components/update-schedules/update-schedules.component';
import { AddScheduleComponent } from './Components/add-schedule/add-schedule.component';
import { AddStationComponent } from './Components/add-station/add-station.component';
import { AddLineComponent } from './Components/add-line/add-line.component';
import { StationServiceService } from 'src/app/Services/station-service.service';
import { LineServiceService } from 'src/app/Services/line-service.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    ScheduleComponent,
    NavbarComponent,
    PricesComponent,
    UserDetailsComponent,
    TicketsComponent,
	ChangePasswordComponent,
    VerificationsComponent,
    PricelistComponent,
    UpdatePricelistComponent,
    TicketValidationComponent,
    EditLinesComponent,
	CheckTicketComponent,
	UpdateSchedulesComponent,
	AddScheduleComponent,
	AddStationComponent,
	AddLineComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [HttpService, LoginServiceService, RegisterServiceService,StationServiceService, ScheduleServiceService, PricelistServiceService, TicketsServiceService,
			        PasswordChangeServiceService, LineServiceService,
              UserServiceService,
              {
                provide: HTTP_INTERCEPTORS, 
                useClass: TokenInterceptor, 
                multi: true}, 
              {
                provide: HTTP_INTERCEPTORS,
                useClass: HttpErrorInterceptor,
                multi: true
			  }
			 ],
  bootstrap: [AppComponent]
})
export class AppModule { }
