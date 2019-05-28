using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Schedule
    {
        public DayOfWeek Day { get; set; }
        public DateTime Time { get; set; }
        public Line Line { get; set; }
    }
}