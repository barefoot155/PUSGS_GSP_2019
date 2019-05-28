using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Vehicle
    {
        public Enums.VehicleType VehicleType { get; set; }
        public Location Location { get; set; }
    }
}