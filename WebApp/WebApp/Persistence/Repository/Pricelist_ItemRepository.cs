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

        public double GetPriceWithDiscount(int pricelistId, int itemId, float coefficient)
        {
            double price = GetPriceForTicketType(pricelistId, itemId);

            return price * coefficient;
        }

        public double GetPriceForTicketType(int pricelistId, int itemId)
        {
            return AppDbContext.Pricelist_Items.Single(pli => pli.PricelistId == pricelistId && pli.ItemId == itemId).Price; ;
        }

        public int GetPricelist_ItemId(int pricelistId, int itemId)
        {
            return AppDbContext.Pricelist_Items.FirstOrDefault(p => p.PricelistId == pricelistId && p.ItemId == itemId).Id;
        }

        public bool AddNewPricelistItem(PricelistItemBindingModel pricelistItem, int pricelistId)
        {
            try
            {

                var pricelistItem1 = new Pricelist_Item() { ItemId = 1, PricelistId = pricelistId, Price = pricelistItem.HourlyPrice };
                var pricelistItem2 = new Pricelist_Item() { ItemId = 2, PricelistId = pricelistId, Price = pricelistItem.DailyPrice };
                var pricelistItem3 = new Pricelist_Item() { ItemId = 3, PricelistId = pricelistId, Price = pricelistItem.MonthlyPrice };
                var pricelistItem4 = new Pricelist_Item() { ItemId = 4, PricelistId = pricelistId, Price = pricelistItem.AnnualPrice };

                AppDbContext.Pricelist_Items.Add(pricelistItem1);
                AppDbContext.Pricelist_Items.Add(pricelistItem2);
                AppDbContext.Pricelist_Items.Add(pricelistItem3);
                AppDbContext.Pricelist_Items.Add(pricelistItem4);


                AppDbContext.SaveChanges();

                return true;
            }
            catch
            {
                return false;
            }
        }

        public ActivePricelistBindingModel GetActivePricelist(int pricelistId)
        {            
            double hourly = AppDbContext.Pricelist_Items.FirstOrDefault(pi => pi.PricelistId == pricelistId && pi.ItemId == 1).Price;
            double daily = AppDbContext.Pricelist_Items.FirstOrDefault(pi => pi.PricelistId == pricelistId && pi.ItemId == 2).Price;
            double monthly = AppDbContext.Pricelist_Items.FirstOrDefault(pi => pi.PricelistId == pricelistId && pi.ItemId == 3).Price;
            double annual = AppDbContext.Pricelist_Items.FirstOrDefault(pi => pi.PricelistId == pricelistId && pi.ItemId == 4).Price;

            Pricelist active = AppDbContext.Pricelists.FirstOrDefault(p => p.IsActive);

            ActivePricelistBindingModel pricelist = new ActivePricelistBindingModel()
            {
                HourlyPrice = hourly,
                DailyPrice = daily,
                MonthlyPrice = monthly,
                AnnualPrice = annual,
                StartDate = active.StartDate,
                EndDate = active.EndDate
            };

            return pricelist;
        }

        public bool UpdatePricelist(ActivePricelistBindingModel pricelist)
        {
            try
            {
                Pricelist pr = AppDbContext.Pricelists.FirstOrDefault(p => p.IsActive);

                Pricelist_Item pri1 = AppDbContext.Pricelist_Items.FirstOrDefault(pi => pi.PricelistId == pr.Id && pi.ItemId == 1);
                Pricelist_Item pri2 = AppDbContext.Pricelist_Items.FirstOrDefault(pi => pi.PricelistId == pr.Id && pi.ItemId == 2);
                Pricelist_Item pri3 = AppDbContext.Pricelist_Items.FirstOrDefault(pi => pi.PricelistId == pr.Id && pi.ItemId == 3);
                Pricelist_Item pri4 = AppDbContext.Pricelist_Items.FirstOrDefault(pi => pi.PricelistId == pr.Id && pi.ItemId == 4);

                pr.StartDate = pricelist.StartDate;
                pr.EndDate = pricelist.EndDate;

                pri1.Price = pricelist.HourlyPrice;
                pri2.Price = pricelist.DailyPrice;
                pri3.Price = pricelist.MonthlyPrice;
                pri4.Price = pricelist.AnnualPrice;

                AppDbContext.SaveChanges();

                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}