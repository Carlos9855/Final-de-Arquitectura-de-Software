using Microsoft.AspNetCore.Mvc;
using C4_Model.Models;
using C4_Model.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;
using C4_Model.Exceptions;
using Microsoft.AspNetCore.Http;

namespace C4_Model.Controllers
{
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private IOrdersService _ordersService;
        public OrdersController(IOrdersService ordersService)
        {
            _ordersService = ordersService;
        }
        [HttpGet]
        public ActionResult<IEnumerable<OrderModel>> GetOrders()
        {
            try
            {
                return Ok(_ordersService.GetOrders());
            }
            catch (BadRequestException ex)
            {
                return BadRequest(ex);
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, $"Something happend: {ex.Message}");
            }

        }
        [HttpGet("{OrderId:int}", Name = "GetOrder")]
        public ActionResult<OrderModel> GetOrder(int OrderId)
        {
            try
            {
                return Ok(_ordersService.GetOrder(OrderId));
            }
            catch (NotFoundException ex)
            {
                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, $"Something happend: {ex.Message}");
            }
        }
        [HttpPost]
        public ActionResult<OrderModel> CreateOrder([FromBody] OrderModel OrderModel)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(OrderModel);
                }
                var url = HttpContext.Request.Host;
                var createdOrder = _ordersService.CreateOrder(OrderModel);
                return CreatedAtRoute("GetOrder", new { OrderId = createdOrder.Id }, createdOrder);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Something happend: {ex.Message}");
            }
        }

        [HttpDelete("{OrderId:int}")]
        public ActionResult<bool> DeleteOrder(int OrderId)
        {
            try
            {
                return Ok(_ordersService.DeleteOrder(OrderId));
            }
            catch (NotFoundException ex)
            {

                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, $"Something happend: {ex.Message}");
            }
        }
        [HttpPut("{OrderId:int}")]
        public ActionResult<OrderModel> UpdateOrder(int OrderId, [FromBody] OrderModel OrderModel)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    foreach (var pair in ModelState)
                    {
                        if (pair.Key == nameof(OrderModel.ClientName) && pair.Value.Errors.Count > 0)
                        {
                            return BadRequest(pair.Value.Errors);
                        }
                    }
                }
                return _ordersService.UpdateOrder(OrderId, OrderModel);
            }

            catch (NotFoundException ex)
            {

                return NotFound(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Something happend: {ex.Message}");
            }
        }

    }
}
