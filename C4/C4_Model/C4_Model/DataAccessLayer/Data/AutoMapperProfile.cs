using AutoMapper;
using C4_Model.Data.Entities;
using C4_Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace C4_Model.Data
{
    public class AutoMapperProfile: Profile
    {
        public AutoMapperProfile()
        {
            this.CreateMap<OrderEntity, OrderModel>()
            .ReverseMap();

            this.CreateMap<OrderModel, OrderEntity>()
            .ReverseMap();
        }
    }
}