using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Station
    {
        public int Id { get; set; }
        public string Name { get; set; }
        [ConcurrencyCheck]
        public string Address { get; set; }
        [ConcurrencyCheck]
        public virtual Location Location { get; set; }
        [ConcurrencyCheck]
        public int LocationId { get; set; }
        public virtual List<Line> Lines { get; set; }

        [Timestamp]
        [ConcurrencyCheck]
        public byte[] RowVersion { get; set; }
    }
}