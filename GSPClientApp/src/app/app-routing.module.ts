import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {RouterModule, Routes} from '@angular/router'
import { ScheduleComponent } from './Components/schedule/schedule.component';
import { LoginComponent } from './Components/login/login.component';
import { RegistrationComponent } from './Components/registration/registration.component';
import { PricesComponent } from 'src/app/Components/prices/prices.component';
import { UserDetailsComponent } from 'src/app/Components/user-details/user-details.component';
import { TicketsComponent } from 'src/app/Components/tickets/tickets.component';
import { ChangePasswordComponent } from 'src/app/Components/change-password/change-password.component';
import { VerificationsComponent } from 'src/app/Components/verifications/verifications.component';
import { PricelistComponent } from 'src/app/Components/pricelist/pricelist.component';
import { UpdatePricelistComponent } from 'src/app/Components/update-pricelist/update-pricelist.component';
import { TicketValidationComponent } from 'src/app/Components/ticket-validation/ticket-validation.component';
import { EditLinesComponent } from './Components/edit-lines/edit-lines.component';
import { CheckTicketComponent } from './Components/check-ticket/check-ticket.component';
import { AddStationComponent } from 'src/app/Components/add-station/add-station.component';
import { AddLineComponent } from 'src/app/Components/add-line/add-line.component';
import { AddScheduleComponent } from 'src/app/Components/add-schedule/add-schedule.component';
import { UploadDocumentComponent } from 'src/app/Components/upload-document/upload-document.component';
import { LinesMapComponent } from 'src/app/Components/lines-map/lines-map.component';
import { AppUserGuard } from 'src/app/Interceptors/appUser.guard';
import { ControllerGuard } from 'src/app/Interceptors/controller.guard';
import { AuthGuard } from 'src/app/Interceptors/auth.guard';
import { UpdateDocumentComponent } from 'src/app/Components/update-document/update-document.component';
import { EditStationsComponent } from 'src/app/Components/edit-stations/edit-stations.component';
import { ViewDocumentComponent } from 'src/app/Components/view-document/view-document.component';
import { RealTimeComponent } from 'src/app/Components/real-time/real-time.component';

const routes:Routes = [
  {path: 'schedules', component: ScheduleComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'pricelist', component: PricesComponent},
  {path: 'userdata', component: UserDetailsComponent},
  {path: 'buyticket', component: TicketsComponent, canActivate: [AppUserGuard]},
  {path: 'passwordchange', component: ChangePasswordComponent},
  {path: 'verifications', component: VerificationsComponent, canActivate: [ControllerGuard]},
  {path: 'addpricelist', component: PricelistComponent, canActivate: [AuthGuard]},
  {path: 'updatepricelist', component:UpdatePricelistComponent, canActivate: [AuthGuard]},
  {path: 'validation', component:TicketValidationComponent, canActivate: [ControllerGuard]},
  {path: 'editlines', component:EditLinesComponent, canActivate: [AuthGuard]},
  {path: 'checkTicket', component: CheckTicketComponent, canActivate: [AppUserGuard]},
  {path: 'addline', component: AddLineComponent, canActivate: [AuthGuard]},
  {path: 'addstation', component : AddStationComponent, canActivate: [AuthGuard]},
  {path: 'editStation', component : EditStationsComponent, canActivate: [AuthGuard]},
  {path: 'addschedule', component : AddScheduleComponent, canActivate: [AuthGuard]},
  {path: 'document', component: UpdateDocumentComponent, canActivate: [AppUserGuard]},
  {path: 'lines', component: LinesMapComponent},
  {path: 'viewimage', component: ViewDocumentComponent},
  {path: 'realtime', component : RealTimeComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
