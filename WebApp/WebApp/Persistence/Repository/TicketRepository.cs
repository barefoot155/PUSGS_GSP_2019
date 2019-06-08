using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public class TicketRepository : Repository<Ticket, int>, ITicketRepository
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
                ExpirationDate = new DateTime(1900, 1, 1),
                IsChecked = false
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
                Pricelist_itemId = pricelistItemId
            };

            if (ticketType == TicketType.HourlyTicket)
            {
                ticket.IsChecked = false;
                ticket.CheckTime = new DateTime(1900, 1, 1);
                ticket.ExpirationDate = new DateTime(1900, 1, 1);
            }
            else if (ticketType == TicketType.DailyTicket)
            {
                ticket.IsChecked = true;
                ticket.CheckTime = DateTime.Now;
                var dayYearMonth = ticket.CheckTime.AddDays(1);
                ticket.ExpirationDate = new DateTime(dayYearMonth.Year, dayYearMonth.Month, dayYearMonth.Day);
            }
            else if (ticketType == TicketType.MothlyTicket)
            {
                ticket.IsChecked = true;
                ticket.CheckTime = DateTime.Now;
                var dayYearMonth = ticket.CheckTime.AddMonths(1);
                ticket.ExpirationDate = new DateTime(dayYearMonth.Year, dayYearMonth.Month, 1);
            }
            else
            {
                //annual 01/01/sledece godine
                ticket.IsChecked = true;
                ticket.CheckTime = DateTime.Now;
                ticket.ExpirationDate = new DateTime(ticket.CheckTime.Year + 1, 1, 1);
            }

            AppDbContext.Tickets.Add(ticket);
            AppDbContext.SaveChanges();

            return ticket;
        }

        public bool ValidateTicket(int ticketId)
        {
            Ticket ticket = AppDbContext.Tickets.FirstOrDefault(t => t.Id == ticketId);

            if (ticket == null)
                return false;

            if (ticket.IsChecked && ticket.ExpirationDate >= DateTime.Now)
                return true;

            return false;
        }

        public bool CheckTicketId(int ticketId)
        {
            return AppDbContext.Tickets.FirstOrDefault(t => t.Id == ticketId) != null;
        }

        public bool CheckTicket(int ticketId)
        {
            Ticket ticket = AppDbContext.Tickets.FirstOrDefault(t => t.Id == ticketId);

            if (ticket == null)
                return false;

            //TODO provjeri da li treba da cekira kartu
            ticket.IsChecked = true;
            ticket.CheckTime = DateTime.Now;

            if (ticket.TicketType == TicketType.HourlyTicket)
            {
                var dayYearMonth = ticket.CheckTime.AddHours(1);
                ticket.ExpirationDate = new DateTime(dayYearMonth.Year, dayYearMonth.Month, dayYearMonth.Day);
            }
            else if (ticket.TicketType == TicketType.DailyTicket)
            {
                var dayYearMonth = ticket.CheckTime.AddDays(1);
                ticket.ExpirationDate = new DateTime(dayYearMonth.Year, dayYearMonth.Month, dayYearMonth.Day);
            }
            else if (ticket.TicketType == TicketType.MothlyTicket)
            {
                var dayYearMonth = ticket.CheckTime.AddMonths(1);
                ticket.ExpirationDate = new DateTime(dayYearMonth.Year, dayYearMonth.Month, 1);
            }
            else
            {
                //annual 01/01/sledece godine
                ticket.ExpirationDate = new DateTime(ticket.CheckTime.Year + 1, 1, 1);
            }

            AppDbContext.SaveChanges();

            return true;
        }
    }
}