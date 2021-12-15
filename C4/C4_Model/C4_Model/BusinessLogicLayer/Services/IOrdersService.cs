using System;
using C4_Model.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
namespace C4_Model.Services
{
    public interface IOrdersService
    {
        public IEnumerable<OrderModel> GetOrders();
        public OrderModel GetOrder(int OrderId);
        public OrderModel CreateOrder(OrderModel OrderModel);
        public bool DeleteOrder(int OrderId);
        public OrderModel UpdateOrder(int OrderId, OrderModel OrderModel);
    }
}