using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApp.Hubs;
using WebApp.Models;

namespace WebApp.Controllers
{
    [RoutePrefix("api/RealTime")]
    public class RealTimeController : ApiController
    {
        private NotificationHub hub;

        public RealTimeController(NotificationHub hub)
        {
            this.hub = hub;
        }

        [HttpPost]
        [Route("SendStationsToHub")]
        public IHttpActionResult SendStationsToHub(List<StationBindingModel> list)
        {
            hub.AddStations(list);
            return Ok();
        }
    }
}
