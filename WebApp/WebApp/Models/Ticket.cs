using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApp.Models
{
    public class Ticket
    {
        public int Id { get; set; }
        public TicketType TicketType { get; set; }
        public CustomerType CustomerType { get; set; }
        public double Price { get; set; }
        public bool IsChecked { get; set; }
        public DateTime CheckTime { get; set; }
        public DateTime ExpirationDate { get; set; }
        public virtual Pricelist_Item Pricelist_item { get; set; }
        public int Pricelist_itemId { get; set; }
    }
}