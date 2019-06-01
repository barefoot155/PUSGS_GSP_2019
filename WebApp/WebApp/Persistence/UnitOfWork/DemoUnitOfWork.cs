using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using Unity;
using WebApp.Persistence.Repository;

namespace WebApp.Persistence.UnitOfWork
{
    public class DemoUnitOfWork : IUnitOfWork
    {
        private readonly DbContext _context;
      
        public DemoUnitOfWork(DbContext context)
        {
            _context = context;
        }
        //[Dependency]
        public IDiscountRepository Discounts { get; set; }
        //[Dependency]
        public IItemRepository Items { get; set; }
        //[Dependency]
        public ILineRepository Lines { get; set; }
        //[Dependency]
        public ILocationRepository Locations { get; set; }
        //[Dependency]
        public IPricelistRepository Pricelists { get; set; }
        //[Dependency]
        public IPricelist_ItemRepository Pricelist_Items { get; set; }
        [Dependency]
        public IScheduleRepository Schedules { get; set; }
        //[Dependency]
        public IStationRepository Stations { get; set; }
        //[Dependency]
        public ITicketRepository Tickets { get; set; }
        [Dependency]
        public IUserRepository Users { get; set; }

        public int Complete()
        {
            return _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}