using System;
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

        public bool AddNewSchedule(AddScheduleBindingModel scheduleBM, int lineId)
        {
            try
            {
                

                var sc = AppDbContext.Schedules.FirstOrDefault(s => s.Day == scheduleBM.DayType && s.LineId == lineId);

                List<string> newTimes = ParseTimesFromString(scheduleBM.NewTimes);

                //ako je null znaci da za taj dan jos ne postoji vrijeme polazaka

                if (sc == null)//checkedTimes bi trebao biti prazan
                {
                    //kreiraj novi sch jer ne postoji za taj dan                    

                    Schedule schedule = new Schedule() { Day = scheduleBM.DayType, LineId = lineId};
                    AppDbContext.Schedules.Add(schedule);
                    AppDbContext.SaveChanges();
                }
                else
                {
                    //azuriraj postojeci
                    foreach (var item in sc.Times)
                    {
                        if (!scheduleBM.CheckedTimes.Contains(item.Time))
                        {                            
                            AppDbContext.ScheduleTimes.Remove(item);
                            AppDbContext.SaveChanges();
                        }
                    }

                    foreach (var item in newTimes)
                    {
                        AppDbContext.ScheduleTimes.Add(new ScheduleTime() { Time = item, ScheduleId = sc.Id });
                        AppDbContext.SaveChanges();
                    }
                }

                return true;
            }
            catch
            {
                return false;
            }
        }

        private List<string> ParseTimesFromString(string newTimes)
        {
            return newTimes.Split(';').ToList();
        }
    }
}