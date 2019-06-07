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
    [RoutePrefix("api/Pricelist")]
    public class PricelistController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;

        public PricelistController(IUnitOfWork iUnitOfWork)
        {
            this.unitOfWork = iUnitOfWork;
        }

        [ResponseType(typeof(double))]
        [Route("GetPricelist")]
        public IHttpActionResult GetPricelist(TicketType ticketType)
        {
            int pricelistId = unitOfWork.Pricelists.GetActivePricelistId();

            int ticketId = unitOfWork.Items.GetTicketIdForTicketType(ticketType);

            double priceForTicketType = unitOfWork.Pricelist_Items.GetPriceForTicketType(pricelistId, ticketId);

            return Ok(priceForTicketType);
        }
        [HttpPost]
        [ResponseType(typeof(int))]
        [Route("AddNewPricelist")]
        public IHttpActionResult AddNewPricelist(PricelistBindingModel pricelist)
        {
            int pricelistId = unitOfWork.Pricelists.AddNewPricelist(pricelist);
            return Ok(pricelistId);
        }

    }
}
