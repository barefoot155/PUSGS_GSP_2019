import { Component, OnInit } from '@angular/core';
import { TicketsServiceService } from 'src/app/Services/tickets-service.service';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {

  loggedIn : boolean = false;
  message: string = "";
  emailbox : string = "";
  emailRegExp = new RegExp('^[a-zA-Z0-9\.\_]+@[a-zA-Z]\.[a-zA-Z]$');

  constructor(private ticketService : TicketsServiceService) { }

  ngOnInit() {
    this.message = "";
    let username = localStorage.getItem('username');

    if(username != null)
    {
      this.loggedIn = true;
    }else{     
      this.loggedIn = false;
    }
  }
  onSubmit(){
    //posalji kartu na email za neregistrovanog korisnika
    if(this.emailRegExp.test(this.emailbox))
    {
      this.message = "";
      this.ticketService.buyTicketUnregistered(this.emailbox).subscribe(data=>{
        this.message = data;    
      },
        error => {this.message = error; console.log(error);}
      ); 
    }
    else{
      this.message = "Unsupported email address format!"
    }
  }
  buyTicket(ticketType : number){
    //karta za ulogovanog
    this.ticketService.buyTicketVerifiedUser(ticketType).subscribe(data=>{
      this.message = data;    
    },
      error => {this.message = error; console.log(error);}
    );    
  }
}
