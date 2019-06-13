using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using WebApp.Models;
using WebApp.Persistence.UnitOfWork;

namespace WebApp.Controllers
{
    [RoutePrefix("api/Ticket")]
    public class TicketController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;

        public TicketController(IUnitOfWork iUnitOfWork)
        {
            this.unitOfWork = iUnitOfWork;
        }

        [ResponseType(typeof(TicketBindingModel))]
        [HttpGet]
        [Route("GetUsersTicket")]
        public IHttpActionResult GetUsersTicket(string username)
        {
            Ticket ticket = unitOfWork.Users.GetUserByUsername(username).Ticket;
            if (ticket != null)
            {
                TicketBindingModel ticketBM = new TicketBindingModel()
                {
                    CheckTime = ticket.CheckTime,
                    CustomerType = ticket.CustomerType,
                    ExpirationDate = ticket.ExpirationDate,
                    Price = ticket.Price,
                    TicketId = ticket.Id,
                    TicketType = ticket.TicketType,
                    IsChecked = ticket.IsChecked
                };
                return Ok(ticketBM);
            }
            else
            {
                return Ok(new TicketBindingModel());
            }
        }
                
        [HttpGet]
        [Route("CheckTicketId")]
        public IHttpActionResult CheckTicketId(int ticketId)
        {
            if(unitOfWork.Tickets.CheckTicketId(ticketId))
            {
                return Ok();
            }
            else
            {
                return Ok("Unknown ticket ID!");
            }
        }

        [HttpGet]
        [Route("ValidateTicket")]
        public IHttpActionResult ValidateTicket(int ticketId)
        {
            if(unitOfWork.Tickets.ValidateTicket(ticketId))
            {
                return Ok("Ticket is valid");
            }
            else
            {
                return Ok("Ticket is not valid");
            }
        }

        [HttpPost]
        [Route("BuyTicketUnregistered")]
        public IHttpActionResult BuyTicketUnregistered(string email)
        {
            int pricelistId = unitOfWork.Pricelists.GetActivePricelistId();
            int itemId = unitOfWork.Items.GetTicketIdForTicketType(TicketType.HourlyTicket);
            double priceForTicketType = unitOfWork.Pricelist_Items.GetPriceForTicketType(pricelistId, itemId);
            int pricelistItemId = unitOfWork.Pricelist_Items.GetPricelist_ItemId(pricelistId, itemId);

            Ticket ticket = unitOfWork.Tickets.BuyTicketUnregistred(priceForTicketType, pricelistItemId);

            if (sendEmailViaWebApi(email, "GSP Ticket", "\nTicket Id:" + ticket.Id + " \nPrice: " + ticket.Price))
                return Ok("Ticket sent to email");
            else
                return Ok("Ticket is bought. Cannot send email at the moment.");
        }
       
        [HttpPost]
        [Route("BuyTicketVerified")]
        public IHttpActionResult BuyTicketVerified(TicketType ticketType, string username)
        {
            var user = unitOfWork.Users.GetUserByUsername(username);

            if (user.Status == VerificationStatus.Verified)
            {
                int pricelistId = unitOfWork.Pricelists.GetActivePricelistId();
                int itemId = unitOfWork.Items.GetTicketIdForTicketType(ticketType);

                float coeff = unitOfWork.Discounts.GetCoefficientForCustomerType(user.Type);
                double price = unitOfWork.Pricelist_Items.GetPriceWithDiscount(pricelistId, itemId, coeff);

                int pricelistItemId = unitOfWork.Pricelist_Items.GetPricelist_ItemId(pricelistId, itemId);

                Ticket ticket = unitOfWork.Tickets.BuyTicketVerified(price, pricelistItemId, user.Type, ticketType);

                user.TicketId = ticket.Id;

                bool updatedUser = unitOfWork.Users.UpdateUser(user);

                if (updatedUser)
                {

                    if (sendEmailViaWebApi(user.Email, "GSP Ticket", "\nTicket Id:" + ticket.Id + " \nPrice: " + ticket.Price))
                        return Ok("Ticket sent to email");
                    else
                        return Ok("Ticket is bought. Cannot send email.");
                        //return ResponseMessage(new HttpResponseMessage() { StatusCode = HttpStatusCode., ReasonPhrase = "Ticket is bought. Cannot send email." });
                }
                else
                {
                    return Ok("Cannot add ticket to user.");
                    //return ResponseMessage(new HttpResponseMessage() { StatusCode = HttpStatusCode.BadRequest, ReasonPhrase = "Cannot add ticket to user." });
                }
            }
            else
            {
                return Ok("User is not verified yet.");
                //return ResponseMessage(new HttpResponseMessage() { StatusCode = HttpStatusCode.BadRequest, ReasonPhrase = "User is not verified yet." });
            }
        }

        private bool sendEmailViaWebApi(string email, string mailSubject, string mailBody)
        {
            MailMessage msg = new MailMessage();
            SmtpClient client = new SmtpClient();
            try
            {
                msg.Subject = mailSubject;
                msg.Body = "Potvrda o kupljenoj karti. \n"+mailBody;
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
