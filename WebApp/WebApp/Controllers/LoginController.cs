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
    [RoutePrefix("api/Login")]
    public class LoginController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;

        public LoginController(IUnitOfWork iUnitOfWork)
        {
            this.unitOfWork = iUnitOfWork;
        }
                
        [Route("PostLogin")]
        public IHttpActionResult PostLogin(LoginBindingModel loginModel)
        {
            if(unitOfWork.Users.Login(loginModel.Username, loginModel.Password))
                return Ok();
            return ResponseMessage(new HttpResponseMessage(HttpStatusCode.Forbidden) { ReasonPhrase = "Wrong username or password." });
        }

        [ResponseType(typeof(UserDataBindingModel))]
        [Route("GetUserData")]
        public IHttpActionResult GetUserData(string username)
        {
            ApplicationUser user = this.unitOfWork.Users.GetUserByUsername(username);

            UserDataBindingModel userData = new UserDataBindingModel()
            {
                UserName = user.UserName,
                Address = user.Address,
                DateOfBirth = user.DateOfBirth,
                Email = user.Email,
                Name = user.Name,
                PhoneNumber = user.PhoneNumber,
                Surname = user.Surname,
                CustomerType = user.Type
            };

            return Ok(userData);
        }
    }
}
