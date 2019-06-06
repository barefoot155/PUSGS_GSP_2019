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

const routes:Routes = [
  {path: 'schedules', component: ScheduleComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'pricelist', component: PricesComponent},
  {path: 'userdata', component: UserDetailsComponent},
  {path: 'buyticket', component: TicketsComponent},
  {path: 'passwordchange', component: ChangePasswordComponent},
  {path: 'verifications', component: VerificationsComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
