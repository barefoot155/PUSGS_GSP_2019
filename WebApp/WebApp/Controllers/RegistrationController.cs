using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApp.Models;
using WebApp.Persistence.UnitOfWork;

namespace WebApp.Controllers
{
    [RoutePrefix("api/Registration")]
    public class RegistrationController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;

        public RegistrationController(IUnitOfWork iUnitOfWork)
        {
            this.unitOfWork = iUnitOfWork;
        }

        [Route("PostRegistration")]
        public IHttpActionResult PostRegistration(RegisterBindingModel registerBinding)
        {
            ApplicationUser user = new ApplicationUser()
            {
                Email = registerBinding.Email,
                UserName = registerBinding.UserName,
                DateOfBirth = registerBinding.DateOfBirth,
                Address = registerBinding.Address,
                Id = registerBinding.UserName,
                Name = registerBinding.Name,
                Surname = registerBinding.Surname,
                PhoneNumber = registerBinding.PhoneNumber,
                PasswordHash = ApplicationUser.HashPassword(registerBinding.Password)
            };

            if (!unitOfWork.Users.Register(user))
            {
                return this.ResponseMessage(new HttpResponseMessage(HttpStatusCode.Forbidden) { ReasonPhrase = "Username or Email already exists." });
            }

            return Ok();
        }
    }
}
