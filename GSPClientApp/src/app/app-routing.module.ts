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

const routes:Routes = [
  {path: 'schedules', component: ScheduleComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'pricelist', component: PricesComponent},
  {path: 'userdata', component: UserDetailsComponent},
  {path: 'buyticket', component: TicketsComponent},
  {path: 'passwordchange', component: ChangePasswordComponent},
  {path: 'verifications', component: VerificationsComponent},
  {path: 'addpricelist', component: PricelistComponent},
  {path: 'updatepricelist', component:UpdatePricelistComponent},
  {path: 'validation', component:TicketValidationComponent},
  {path: 'editlines', component:EditLinesComponent},
  {path: 'checkTicket', component: CheckTicketComponent}
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
