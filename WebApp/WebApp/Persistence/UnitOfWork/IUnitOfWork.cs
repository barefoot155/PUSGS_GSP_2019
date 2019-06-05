using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Persistence.Repository;

namespace WebApp.Persistence.UnitOfWork
{
    public interface IUnitOfWork : IDisposable
    {
        IDiscountRepository Discounts { get; set; }
        IItemRepository Items { get; set; }
        ILineRepository Lines { get; set; }
        ILocationRepository Locations {get;set;}
        IPricelistRepository Pricelists { get; set; }
        IPricelist_ItemRepository Pricelist_Items { get; set; }
        IScheduleRepository Schedules { get; set; }
        IStationRepository Stations { get; set; }
        ITicketRepository Tickets { get; set; }
        IUserRepository Users { get; set; }
        IScheduleTimeRepository ScheduleTimes { get; set; }

        int Complete();
    }
}
