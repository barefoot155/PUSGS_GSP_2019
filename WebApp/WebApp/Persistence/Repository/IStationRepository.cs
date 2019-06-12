using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public interface IStationRepository : IRepository<Station, int>
    {
        bool AddNewStation(StationBindingModel station);
        List<string> GetAllStationNames();
        StationBindingModel GetStationByName(string name);
        Task<bool> UpdateStation(StationBindingModel station);
        bool RemoveStation(string stationName);
    }
}
