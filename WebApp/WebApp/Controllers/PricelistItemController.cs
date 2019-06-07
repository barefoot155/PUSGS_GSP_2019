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
    [RoutePrefix("api/PricelistItem")]
    public class PricelistItemController : ApiController
    {
        private readonly IUnitOfWork unitOfWork;

        public PricelistItemController(IUnitOfWork iUnitOfWork)
        {
            this.unitOfWork = iUnitOfWork;
        }

        [HttpPost]
        [ResponseType(typeof(string))]
        [Route("AddNewPricelistItem")]
        public IHttpActionResult AddNewPricelistItem(PricelistItemBindingModel pricelist)
        {
            if(unitOfWork.Pricelist_Items.AddNewPricelistItem(pricelist, unitOfWork.Pricelists.GetActivePricelistId()))
                return Ok("Successfully added.");
            else
                return ResponseMessage(new HttpResponseMessage() { StatusCode = HttpStatusCode.Forbidden, ReasonPhrase = "Cannot add new pricelist." });
        }
        [HttpGet]
        [ResponseType(typeof(ActivePricelistBindingModel))]
        [Route("GetActivePricelist")]
        public IHttpActionResult GetActivePricelist()
        {
            ActivePricelistBindingModel pricelist = unitOfWork.Pricelist_Items.GetActivePricelist(unitOfWork.Pricelists.GetActivePricelistId());
            return Ok(pricelist);
        }

        [HttpPost]
        [Route("UpdatePricelist")]
        public IHttpActionResult UpdatePricelist(ActivePricelistBindingModel updatedPricelist)
        {
            if(unitOfWork.Pricelist_Items.UpdatePricelist(updatedPricelist))
                return Ok();
            else
                return ResponseMessage(new HttpResponseMessage() { StatusCode = HttpStatusCode.Forbidden, ReasonPhrase = "Cannot update pricelist." });
        }
    }
}
