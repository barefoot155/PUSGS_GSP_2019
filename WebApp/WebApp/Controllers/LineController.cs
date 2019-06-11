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
    }
}
