using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using WebApp.Models;
using WebApp.Persistence.UnitOfWork;

namespace WebApp.Controllers
{
    [RoutePrefix("api/Station")]
    public class StationController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;

        public StationController(IUnitOfWork iUnitOfWork)
        {
            this.unitOfWork = iUnitOfWork;
        }

        [HttpPost]
        [ResponseType(typeof(bool))]
        [Route("AddNewStation")]
        [Authorize(Roles = "Admin")]
        public IHttpActionResult AddNewStation(StationBindingModel station)
        {            
            return Ok(unitOfWork.Stations.AddNewStation(station));
        }

        [HttpGet]
        [ResponseType(typeof(List<string>))]
        [Route("GetAllStations")]
        public IHttpActionResult GetAllStations()
        {
            return Ok(unitOfWork.Stations.GetAllStationNames());
        }

        [HttpGet]
        [ResponseType(typeof(StationBindingModel))]
        [Route("GetStationByName")]
        public IHttpActionResult GetStationByName(string name)
        {
            return Ok(unitOfWork.Stations.GetStationByName(name));
        }

        [HttpPost]
        [Route("UpdateStation")]
        [Authorize(Roles = "Admin")]
        public async Task<IHttpActionResult> UpdateStation(StationBindingModel station)
        {
            bool retVal = await unitOfWork.Stations.UpdateStation(station);

            if (retVal)
                return Ok();
            else
                return BadRequest();
        }

        [HttpDelete]
        [Route("RemoveStation")]
        [Authorize(Roles = "Admin")]
        public IHttpActionResult RemoveStation(string stationName)
        {
            if (unitOfWork.Stations.RemoveStation(stationName))
            {
                return Ok("Station removed");
            }
            else
            {
                return BadRequest("Conflict occured while accessing db");
            }
        }
    }    
}
