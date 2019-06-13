import { TicketType } from './ticketType';

export class TicketModel{
    TicketId : number;
    ExpirationDate : string;
    CheckTime : string;
    IsChecked : boolean;
    TicketType : TicketType;
    Price : number;
}