using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Enums
    {
        public enum TicketType { HourlyTicket, DailyTicket, MothlyTicket, AnnualTicket };

        public enum CustomerType { Student, Pensioner, Regular };
        public enum VehicleType { Bus, Tram, Trolleybus};
    }
}