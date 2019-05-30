using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Schedule
    {
        public int Id { get; set; }
        public DayOfWeek Day { get; set; }
        public List<DateTime> Times { get; set; }
        public Line Line { get; set; }
        public int LineId { get; set; }
    }
}