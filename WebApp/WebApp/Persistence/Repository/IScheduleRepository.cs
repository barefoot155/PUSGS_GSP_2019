using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public interface IScheduleRepository:IRepository<Schedule,int>
    {
        IEnumerable<Schedule> GetSchedulesByLineId(int lineId, DayType day);
        bool AddNewSchedule(ScheduleBindingModel scheduleBM);
    }
}
