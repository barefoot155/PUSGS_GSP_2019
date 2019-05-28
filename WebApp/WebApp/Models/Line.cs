using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Line
    {
        public short Number { get; set; }
        public List<Station> Stations {get;set;}
        public List<Vehicle> Vehicles { get; set; }
    }
}