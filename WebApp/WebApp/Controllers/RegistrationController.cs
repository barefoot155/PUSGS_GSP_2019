using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
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
            DateTime.TryParse(registerBinding.DateOfBirth, out DateTime date);

            ApplicationUser user = new ApplicationUser()
            {
                Email = registerBinding.Email,
                UserName = registerBinding.UserName,
                DateOfBirth = date,
                Address = registerBinding.Address,
                Id = registerBinding.UserName,
                Name = registerBinding.Name,
                Surname = registerBinding.Surname,
                PhoneNumber = registerBinding.PhoneNumber,
                PasswordHash = ApplicationUser.HashPassword(registerBinding.Password),
                Type = registerBinding.CustomerType,
                Status = VerificationStatus.Unverified
            };

            if (!unitOfWork.Users.Register(user))
            {
                return this.ResponseMessage(new HttpResponseMessage(HttpStatusCode.Forbidden) { ReasonPhrase = "Username or Email already exists." });
            }

            return Ok();
        }

        [Route("VerifyAppUser")]
        [HttpGet]
        public IHttpActionResult VerifyAppUser(string username)
        {
            if(unitOfWork.Users.SetVerificationStatus(username, VerificationStatus.Verified, out string email))
            {
                string subject = "Verification";
                string body = "Your verification status has been changed to VERIFIED.";
                sendEmailViaWebApi(email, subject, body);
                return Ok("Verification succeed");
            }
            else
            {
                return BadRequest("Verification failed");
            }
        }

        [Route("DeclineAppUser")]
        [HttpGet]
        public IHttpActionResult DeclineAppUser(string username)
        {
            if (unitOfWork.Users.SetVerificationStatus(username, VerificationStatus.Unverified, out string email))
            {
                string subject = "Verification";
                string body = "Your verification status has been changed to UNVERIFIED.";
                sendEmailViaWebApi(email, subject, body);
                return Ok("Verification succeed");
            }
            else
            {
                return BadRequest("Verification failed");
            }
        }

        private bool sendEmailViaWebApi(string email, string mailSubject, string mailBody)
        {
            MailMessage msg = new MailMessage();
            SmtpClient client = new SmtpClient();
            try
            {
                msg.Subject = mailSubject;
                msg.Body = mailBody;
                msg.From = new MailAddress("gsp.pusgs@gmail.com");
                msg.To.Add(email);
                msg.IsBodyHtml = true;
                client.Host = "smtp.gmail.com";
                NetworkCredential basicauthenticationinfo = new System.Net.NetworkCredential("gsp.pusgs@gmail.com", "Admin123!");
                client.Port = int.Parse("587");
                client.EnableSsl = true;
                client.UseDefaultCredentials = false;
                client.Credentials = basicauthenticationinfo;
                client.DeliveryMethod = SmtpDeliveryMethod.Network;
                client.Send(msg);
            }
            catch
            {
                //ne moze da posalje mejl
                return false;
            }

            return true;
        }
    }
}
