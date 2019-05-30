using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Ticket
    {
        public int Id { get; set; }
        public TicketType TicketType { get; set; }
        public double Price { get; set; }
        public DateTime CheckTime { get; set; }
        public DateTime ExpirationDate { get; set; }
    }
}