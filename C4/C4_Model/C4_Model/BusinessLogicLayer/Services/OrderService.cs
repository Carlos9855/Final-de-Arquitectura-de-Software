using AutoMapper;
using C4_Model.Data.Entities;
using C4_Model.Data.Repository;
using C4_Model.Exceptions;
using C4_Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace C4_Model.Services
{
    public class OrderService: IOrdersService
    {
        
            private ILibraryRepository _libraryRepository;
            private IMapper _mapper;
        
        public OrderService(ILibraryRepository libraryRepository, IMapper _mapper)
        {
            this._libraryRepository = libraryRepository;
            this._mapper = _mapper;
        }

        public IEnumerable<OrderModel> GetOrders()
        {
            var entityList = _libraryRepository.GetOrders();
            var modelList = _mapper.Map<IEnumerable<OrderModel>>(entityList);
            return modelList;
        }
        public OrderModel GetOrder(int OrderId)
        {
            var Order = _libraryRepository.GetOrder(OrderId);

            if (Order == null)
            {
                throw new NotFoundException($"The Order {OrderId} doesnt exists, try it with a new id");
            }

            return _mapper.Map<OrderModel>(Order);
        }

        public OrderModel CreateOrder(OrderModel OrderModel)
        {

            var entityreturned = _libraryRepository.CreateOrder(_mapper.Map<OrderEntity>(OrderModel));

            return _mapper.Map<OrderModel>(entityreturned);
        }

        public bool DeleteOrder(int OrderId)
        {
            var OrderToDelete = GetOrder(OrderId);
            return _libraryRepository.DeleteOrder(OrderId);
        }

        public OrderModel UpdateOrder(int OrderId, OrderModel OrderModel)
        {

            var OrderToUpdate = _libraryRepository.UpdateOrder(_mapper.Map<OrderEntity>(OrderModel));


            return _mapper.Map<OrderModel>(OrderToUpdate);
        }
    }
}

