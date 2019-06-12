using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Line
    {
        public int Id { get; set; }
        public string Number { get; set; }
        public virtual List<Station> Stations { get; set; }
        public LineType LineType { get; set; }
        [Timestamp]
        public byte[] RowVersion { get; set; }
    }
}