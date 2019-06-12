using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
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

        public List<string> GetAllStationNames()
        {
            List<string> ret = new List<string>();

            foreach (Station station in AppDbContext.Stations.ToList())
            {
                ret.Add(station.Name);
            }

            return ret;
        }

        public StationBindingModel GetStationByName(string name)
        {
            Station station = AppDbContext.Stations.FirstOrDefault(s => s.Name == name);

            if (station != null)
            {

                StationBindingModel stationBM = new StationBindingModel() { Name = station.Name, Address = station.Address, Lat = station.Location.Lat, Lon = station.Location.Lon, RowVersion = station.RowVersion };

                return stationBM;
            }
            else
            {
                return new StationBindingModel();
            }
        }

        public async Task<bool> UpdateStation(StationBindingModel station)
        {
            try
            {
                Station st = await AppDbContext.Stations.FirstOrDefaultAsync(s=>s.Name == station.Name);
                if(st != null)
                {
                    st.Location.Lat = station.Lat;
                    st.Location.Lon = station.Lon;
                    st.Address = station.Address;
                    byte[] a = st.RowVersion;
                    
                    if (a.SequenceEqual(station.RowVersion))
                    {
                        AppDbContext.Entry(st).State = EntityState.Modified;
                        await AppDbContext.SaveChangesAsync();
                    }
                    else
                        throw new DbUpdateConcurrencyException();
                    
                    return true;
                }
                else
                {
                    return false;
                }
            }catch(DbUpdateConcurrencyException concEx)
            {
                return false;
            }
        }
    }
}