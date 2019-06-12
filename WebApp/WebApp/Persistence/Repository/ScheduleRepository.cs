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
                Schedule sc = AppDbContext.Schedules.FirstOrDefault(s => s.Day == scheduleBM.DayType && s.LineId == lineId);

                List<string> newTimes = ParseTimesFromString(scheduleBM.NewTimes);

                //ako je null znaci da za taj dan jos ne postoji vrijeme polazaka

                if (sc == null)//checkedTimes bi trebao biti prazan
                {
                    //kreiraj novi sch jer ne postoji za taj dan                    

                    sc = new Schedule() { Day = scheduleBM.DayType, LineId = lineId, Times = new List<ScheduleTime>() };
                    AppDbContext.Schedules.Add(sc);
                    AppDbContext.SaveChanges();
                }
                
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

                return true;
            }
            catch(Exception ex)
            {
                return false;
            }
        }

        private List<string> ParseTimesFromString(string newTimes)
        {
            return newTimes.Split(';').ToList();
        }

        public bool RemoveSchedule(string lineNumber, DayType day)
        {
            try
            {
                int lineId = AppDbContext.Lines.Single(l => l.Number == lineNumber).Id;
                Schedule schedule = AppDbContext.Schedules.Single(s => s.Day == day && s.LineId == lineId);
                AppDbContext.Schedules.Remove(schedule);

                AppDbContext.SaveChanges();

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}