using System;
using C4_Model.Data.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace C4_Model.Data.Repository
{
    public class LibraryRepository : ILibraryRepository
    {
        private List<OrderEntity> Orders = new List<OrderEntity>(){
            new OrderEntity(){Id=1,ClientName="Jorge Flores",OrderTime=new DateTime(2021,11,19)},
            new OrderEntity(){Id=2,ClientName="Juan Martinez",OrderTime=new DateTime(2021,11,19)},
            new OrderEntity(){Id=3,ClientName="Andrea Crrasco",OrderTime=new DateTime(2021,11,19)},
            new OrderEntity(){Id=4,ClientName="Laura Ovando",OrderTime=new DateTime(2021,11,19)}
        };
        public OrderEntity GetOrder(int OrderId)
        {
            return Orders.FirstOrDefault(o => o.Id == OrderId);
        }
        public OrderEntity CreateOrder(OrderEntity OrderEntity)
        {
            int OrderId;
            if (Orders.Count() == 0)
            {
                OrderId = 1;
            }
            else
            {
                OrderId = Orders.OrderByDescending(o => o.Id).FirstOrDefault().Id + 1;
            }
            OrderEntity.Id = OrderId;
            Orders.Add(OrderEntity);
            return OrderEntity;
        }

        public bool DeleteOrder(int OrderId)
        {
            var OrderToDelete = GetOrder(OrderId);
            Orders.Remove(OrderToDelete);
            return true;
        }

        public IEnumerable<OrderEntity> GetOrders()
        {
            return Orders;
        }

        public OrderEntity UpdateOrder(OrderEntity OrderEntity)
        {
            var OrderToUpdate = GetOrder(OrderEntity.Id);
            OrderToUpdate.ClientName = OrderEntity.ClientName ?? OrderToUpdate.ClientName;
            OrderToUpdate.OrderTime = OrderEntity.OrderTime ?? OrderToUpdate.OrderTime;
            OrderToUpdate.OrderType = OrderEntity.OrderType ?? OrderToUpdate.OrderType;
            return OrderToUpdate;
        }
    }
}
