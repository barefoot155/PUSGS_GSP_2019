using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Line
    {
        public int Id { get; set; }
        public short Number { get; set; }
        public virtual List<Station> Stations { get; set; }
    }
}