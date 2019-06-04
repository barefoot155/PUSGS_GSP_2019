using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public class DiscountRepository : Repository<Discount, int>, IDiscountRepository
    {
        protected ApplicationDbContext AppDbContext { get { return context as ApplicationDbContext; } }

        public DiscountRepository(DbContext context) : base(context)
        {

        }

        public float GetCoefficientForCustomerType(CustomerType type)
        {
            return AppDbContext.Discounts.Single(d => d.CustomerType == type).Coefficient;
        }

        //public IEnumerable<Discount> GetAllProductsForSinglePage(int pageIndex, int pageSize)
        //{
        //    return AppDbContext.Products.Skip((pageIndex - 1) * pageSize).Take(pageSize);
        //}
    }
}