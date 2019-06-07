using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public interface IPricelist_ItemRepository : IRepository<Pricelist_Item,int>
    {
        double GetPriceWithDiscount(int pricelistId, int itemId, float coefficient);
        double GetPriceForTicketType(int pricelistId, int itemId);
        int GetPricelist_ItemId(int pricelistId, int itemId);
        bool AddNewPricelistItem(PricelistItemBindingModel pricelistItem, int pricelistId);
        ActivePricelistBindingModel GetActivePricelist(int pricelistId);
        bool UpdatePricelist(ActivePricelistBindingModel pricelist);
    }
}
