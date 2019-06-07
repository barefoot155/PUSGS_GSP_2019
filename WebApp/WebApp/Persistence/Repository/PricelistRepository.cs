using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public class PricelistRepository : Repository<Pricelist, int>, IPricelistRepository
    {
        protected ApplicationDbContext AppDbContext { get { return context as ApplicationDbContext; } }

        public PricelistRepository(DbContext context) : base(context)
        {

        }

        public int GetActivePricelistId()
        {
            return AppDbContext.Pricelists.Single(pl => pl.IsActive).Id;
        }

        public int AddNewPricelist(PricelistBindingModel pricelist)
        {
            var activePricelist = AppDbContext.Pricelists.Where(pl => pl.IsActive).First();

            activePricelist.IsActive = false;
            AppDbContext.SaveChanges();

            Pricelist newPricelist = new Pricelist()
            {
                StartDate = pricelist.StartDate,
                EndDate = pricelist.EndDate,
                IsActive = true
            };
            AppDbContext.Pricelists.Add(newPricelist);
            AppDbContext.SaveChanges();
            return GetActivePricelistId();
        }
    }
}