using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public class ScheduleTimeRepository : Repository<ScheduleTime, int>, IScheduleTimeRepository
    {
        protected ApplicationDbContext AppDbContext { get { return context as ApplicationDbContext; } }

        public ScheduleTimeRepository(DbContext context) : base(context)
        {

        }
    }
}