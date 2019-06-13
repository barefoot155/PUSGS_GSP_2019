using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WebApp.Models;
using WebApp.Persistence.UnitOfWork;

namespace WebApp.Controllers
{
    [Authorize]
    [RoutePrefix("api/Line")]
    public class LineController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;

        public LineController(IUnitOfWork iUnitOfWork)
        {
            this.unitOfWork = iUnitOfWork;
        }

        [HttpPost]
        [Route("AddNewLine")]
        [Authorize(Roles = "Admin")]
        public IHttpActionResult AddNewLine(LineBindingModel line)
        {
            if(unitOfWork.Lines.AddNewLine(line))
            {
                return Ok("Line added.");
            }
            else
            {
                return BadRequest("Error. Line not added.");
            }
        }

        [HttpPatch]
        [Route("UpdateLine")]
        [Authorize(Roles = "Admin")]
        public IHttpActionResult UpdateLine(LineBindingModel lineModel)
        {
            if(unitOfWork.Lines.UpdateLine(lineModel))
            {
                return Ok("Line updated.");
            }
            else
            {
                return BadRequest("Line not found.");
            }
        }

        [HttpGet]
        [ResponseType(typeof(List<StationBindingModel>))]
        [Route("GetStationsByLineNumber")]
        [AllowAnonymous]
        public IHttpActionResult GetStationsByLineNumber(string lineNumber)
        {
            var stations = unitOfWork.Lines.GetAllStationsByLineNumber(lineNumber);
            List<StationBindingModel> ret = new List<StationBindingModel>();

            foreach (var item in stations)
            {
                ret.Add(new StationBindingModel() { Address = item.Address, Lat = item.Location.Lat, Lon = item.Location.Lon, Name = item.Name });
            }

            return Ok(ret);
        }

        [HttpDelete]
        [Route("RemoveLine")]
        [Authorize(Roles = "Admin")]
        public IHttpActionResult RemoveLine(int lineId)
        {
            if(unitOfWork.Lines.RemoveLine(lineId))
            {
                return Ok("Line removed");
            }
            else
            {
                return BadRequest("Conflict occured while accessing db");
            }
        }
    }
}
