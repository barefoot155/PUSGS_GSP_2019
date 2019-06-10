﻿using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public class ScheduleRepository : Repository<Schedule, int>, IScheduleRepository
    {
        protected ApplicationDbContext AppDbContext { get { return context as ApplicationDbContext; } }

        public ScheduleRepository(DbContext context) : base(context)
        {

        }

        public IEnumerable<Schedule> GetSchedulesByLineId(int lineId, DayType day)
        {
            List<Schedule> temp = AppDbContext.Schedules.ToList();
            return AppDbContext.Schedules.Where(s => s.LineId == lineId && s.Day == day).ToList();
        }

        public bool AddNewSchedule(ScheduleBindingModel scheduleBM)
        {
            try
            {


                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}