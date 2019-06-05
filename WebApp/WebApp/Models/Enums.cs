using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public enum TicketType { HourlyTicket = 0, DailyTicket, MothlyTicket, AnnualTicket };

    public enum CustomerType { Student = 0, Pensioner, Regular };
    public enum LineType { Urban = 0, Suburban };
}