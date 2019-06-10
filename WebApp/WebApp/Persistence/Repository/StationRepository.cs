using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public class StationRepository : Repository<Station, int>, IStationRepository
    {
        protected ApplicationDbContext AppDbContext { get { return context as ApplicationDbContext; } }

        public StationRepository(DbContext context) : base(context)
        {

        }

        public bool AddNewStation(StationBindingModel station)
        {
            Location location = new Location() { Lat = station.Lat, Lon = station.Lon };

            AppDbContext.Locations.Add(location);
            AppDbContext.SaveChanges();

            Station s = new Station()
            {
                Address = station.Address,
                Name = station.Name,
                LocationId = AppDbContext.Locations.FirstOrDefault(l=>l.Lat == location.Lat && l.Lon == location.Lon).Id
            };

            try
            {
                AppDbContext.Stations.Add(s);
                AppDbContext.SaveChanges();
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}