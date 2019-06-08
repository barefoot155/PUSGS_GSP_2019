import { TicketType } from './ticketType';

export class TicketModel{
    TicketId : number;
    ExpirationDate : string; //TODO date umjesto stringa
    CheckTime : string; //TODO date umjesto stringa
    IsChecked : boolean;
    TicketType : TicketType;
    Price : number;
}