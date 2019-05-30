using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Pricelist_Item
    {
        public int Id { get; set; }
        public Item Item { get; set; }
        public int ItemId { get; set; }
        public Pricelist Pricelist { get; set; }
        public int PricelistId { get; set; }
        public double Price { get; set; }
    }
}