using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class ScheduleTime
    {
        public int Id { get; set; }
        public string Time { get; set; }
        public int ScheduleId { get; set; }
        public Schedule Schedule { get; set; }
    }
}