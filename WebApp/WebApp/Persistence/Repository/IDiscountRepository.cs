using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public interface IDiscountRepository : IRepository<Discount, int>
    {
        //IEnumerable<Discount> GetAllDiscountsForSinglePage(int pageIndex, int pageSize);
    }
}