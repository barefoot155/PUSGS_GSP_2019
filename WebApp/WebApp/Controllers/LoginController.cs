using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApp.Persistence.UnitOfWork;

namespace WebApp.Controllers
{
    [RoutePrefix("api/Login")]
    public class LoginController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;

        public LoginController(IUnitOfWork iUnitOfWork)
        {
            this.unitOfWork = iUnitOfWork;
        }
                
        [Route("PostLogin")]
        public IHttpActionResult PostLogin(string username,string password)
        {
            if(unitOfWork.Users.Login(username,password))
                return Ok();
            return ResponseMessage(new HttpResponseMessage(HttpStatusCode.Forbidden) { ReasonPhrase = "Wrong username or password." });
        }
    }
}
