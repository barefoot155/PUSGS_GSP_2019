using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public class TicketRepository:Repository<Ticket,int>,ITicketRepository
    {
        protected ApplicationDbContext AppDbContext { get { return context as ApplicationDbContext; } }

        public TicketRepository(DbContext context) : base(context)
        {

        }                

        public Ticket BuyTicketUnregistred(double price, int pricelistItemId)
        {
            Ticket ticket = new Ticket()
            {
                CustomerType = CustomerType.Regular,
                TicketType = TicketType.HourlyTicket,
                Price = price,
                Pricelist_itemId = pricelistItemId,
                CheckTime = new DateTime(1900, 1, 1),
                ExpirationDate = new DateTime(1900,1,1)
            };

            AppDbContext.Tickets.Add(ticket);
            AppDbContext.SaveChanges();

            return ticket;
        }

        public Ticket BuyTicketVerified(double price, int pricelistItemId, CustomerType customerType, TicketType ticketType)
        {
            Ticket ticket = new Ticket()
            {
                CustomerType = customerType,
                TicketType = ticketType,
                Price = price,
                Pricelist_itemId = pricelistItemId,
                CheckTime = new DateTime(1900, 1, 1),
                ExpirationDate = new DateTime(1900, 1, 1)
            };

            AppDbContext.Tickets.Add(ticket);
            AppDbContext.SaveChanges();
            
            return ticket;
        }
    }
}