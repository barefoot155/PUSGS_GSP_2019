using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public class Pricelist_ItemRepository : Repository<Pricelist_Item, int>, IPricelist_ItemRepository
    {
        protected ApplicationDbContext AppDbContext { get { return context as ApplicationDbContext; } }

        public Pricelist_ItemRepository(DbContext context) : base(context)
        {

        }
    }
}