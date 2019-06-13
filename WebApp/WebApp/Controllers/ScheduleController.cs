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
    [RoutePrefix("api/Schedule")]
    public class ScheduleController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;

        public ScheduleController(IUnitOfWork iUnitOfWork)
        {
            this.unitOfWork = iUnitOfWork;
        }


        [ResponseType(typeof(IEnumerable<string>))]
        [HttpGet]
        [Route("GetLinesByType")]
        public IHttpActionResult GetLinesByType(LineType lineType)
        { 
            List<string> ret = unitOfWork.Lines.GetLinesByLineType(lineType);
            return Ok(ret);
        }

        [ResponseType(typeof(IEnumerable<string>))]
        [HttpGet]
        [Route("GetAllLines")]
        public IHttpActionResult GetAllLines()
        {
            List<string> ret = unitOfWork.Lines.GetAllLines();
            return Ok(ret);
        }

        [ResponseType(typeof(IEnumerable<string>))]
        [HttpGet]
        [Route("GetSchedule")]
        public IHttpActionResult GetSchedule(string lineNumber, DayType dayType)
        {
            int lineId = unitOfWork.Lines.GetLineIdByLineNumber(lineNumber);
            var schs = unitOfWork.Schedules.GetSchedulesByLineId(lineId, dayType).ToList();
            List<string> schTimes = new List<string>();
            if (schs.Count ==0)
                return Ok(schTimes);
            var times = schs[0].Times;
            foreach (var item in times)
            {
                schTimes.Add(item.Time);
            }
            return Ok(schTimes);
        }

        [HttpPost]
        [Route("AddNewSchedule")]
        [Authorize(Roles = "Admin")]
        public IHttpActionResult AddNewSchedule(AddScheduleBindingModel schedule)
        {
            int lineId = unitOfWork.Lines.GetLineIdByLineNumber(schedule.Number);
            unitOfWork.Schedules.AddNewSchedule(schedule, lineId);
            return Ok();
        }

        [HttpDelete]
        [Route("RemoveSchedule")]
        [Authorize(Roles = "Admin")]
        public IHttpActionResult RemoveSchedule(string lineNumber, DayType day)
        {
            if(unitOfWork.Schedules.RemoveSchedule(lineNumber, day))
            {
                return Ok("Schedule removed");
            }
            else
            {
                return BadRequest("Conflict occured while accessing db");
            }
        }

        [ResponseType(typeof(LineBindingModel))]
        [HttpGet]
        [Route("GetLineData")]
        public IHttpActionResult GetLineData(string lineNumber)
        {
            Line line = unitOfWork.Lines.GetLineByLineNumber(lineNumber);
            LineBindingModel lineBindingModel = new LineBindingModel() { Id = line.Id, Number = line.Number, LineType = line.LineType, RowVersion = line.RowVersion };
            lineBindingModel.Stations = new List<string>();
            foreach (Station station in line.Stations)
            {
                lineBindingModel.Stations.Add(station.Name);
            }

            return Ok(lineBindingModel);
        }

        [ResponseType(typeof(LineBindingModel))]
        [HttpGet]
        [Route("GetLineDataById")]
        public IHttpActionResult GetLineDataById(int lineId)
        {
            try
            {
                Line line = unitOfWork.Lines.GetLineById(lineId);
                LineBindingModel lineBindingModel = new LineBindingModel() { Id = line.Id, Number = line.Number, LineType = line.LineType, RowVersion = line.RowVersion };
                lineBindingModel.Stations = new List<string>();
                foreach (Station station in line.Stations)
                {
                    lineBindingModel.Stations.Add(station.Name);
                }

                return Ok(lineBindingModel);
            }
            catch (Exception ex) 
            {
                return BadRequest();
            }
        }

        [ResponseType(typeof(List<string>))]
        [HttpGet]
        [Route("GetAllStations")]
        public IHttpActionResult GetAllStations()
        {
            List<string> stations = unitOfWork.Stations.GetAllStationNames();

            return Ok(stations);
        }
    }
}
