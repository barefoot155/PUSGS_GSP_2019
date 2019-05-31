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
        
        
        [ResponseType(typeof(IEnumerable<Schedule>))]
        [HttpGet]
        [Route("GetSchedule")]
        public IHttpActionResult GetSchedule(int lineId)
        {
            return Ok(unitOfWork.Schedules.GetSchedulesByLineId(lineId));
        }
    }
}
