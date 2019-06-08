using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public interface ITicketRepository:IRepository<Ticket, int>
    {
        Ticket BuyTicketUnregistred(double price, int pricelistItemId);
        Ticket BuyTicketVerified(double price, int pricelistItemId, CustomerType customerType, TicketType ticketType);
        bool ValidateTicket(int ticketId);
        bool CheckTicketId(int ticketId);
        bool CheckTicket(int ticketId);
    }
}
