import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';

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
import { AddScheduleComponent } from './Components/add-schedule/add-schedule.component';
import { AddStationComponent } from './Components/add-station/add-station.component';
import { AddLineComponent } from './Components/add-line/add-line.component';
import { StationServiceService } from 'src/app/Services/station-service.service';
import { LineServiceService } from 'src/app/Services/line-service.service';
import { UploadFileServiceService } from 'src/app/Services/upload-file-service.service';
import { UploadDocumentComponent } from 'src/app/Components/upload-document/upload-document.component';
import { LinesMapComponent } from 'src/app/Components/lines-map/lines-map.component';
import { AuthGuard } from 'src/app/Interceptors/auth.guard';
import { UpdateDocumentComponent } from './Components/update-document/update-document.component';
import { EditStationsComponent } from './Components/edit-stations/edit-stations.component';
import { ViewDocumentComponent } from './Components/view-document/view-document.component';
import { RealTimeComponent } from './Components/real-time/real-time.component';
import { ClickService } from 'src/app/Services/click-service.service';
import { RealTimeServiceService } from 'src/app/Services/real-time-service.service';
import { HomePageComponent } from './Components/home-page/home-page.component';

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
	AddScheduleComponent,
	AddStationComponent,
	AddLineComponent,
    UploadDocumentComponent,
  LinesMapComponent,
  UpdateDocumentComponent,
  EditStationsComponent,
  ViewDocumentComponent,
  RealTimeComponent,
  HomePageComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
	AgmCoreModule.forRoot({apiKey: 'AIzaSyDnihJyw_34z5S1KZXp90pfTGAqhFszNJk'})
  ],
  providers: [HttpService, LoginServiceService, RegisterServiceService,StationServiceService, ScheduleServiceService, PricelistServiceService, TicketsServiceService,
			        PasswordChangeServiceService, LineServiceService,
              UserServiceService,ClickService, RealTimeServiceService,
			  UploadFileServiceService,
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
