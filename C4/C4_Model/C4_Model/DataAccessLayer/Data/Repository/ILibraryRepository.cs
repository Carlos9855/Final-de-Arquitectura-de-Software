using System;
using C4_Model.Data.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace C4_Model.Data.Repository
{
    public interface ILibraryRepository
    {
        public IEnumerable<OrderEntity> GetOrders();
        public OrderEntity GetOrder(int OrderId);
        public OrderEntity CreateOrder(OrderEntity OrderEntity);
        public bool DeleteOrder(int OrderId);
        public OrderEntity UpdateOrder(OrderEntity OrderEntity);
    }
}
