using AutoMapper;
using C4_Model.Data.Repository;
using C4_Model.Services;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;

namespace Test_C4_Model
{
    [TestClass]
    public class Test_OrderService
    {
        [TestMethod]
        public void Test_Get_CLientName()
        {
            var library = new LibraryRepository();
            var mapper = new Mapper();
            var order = new OrderService(library, mapper);
            var result = order.GetOrder(1);
            Assert.AreEqual(result.ClientName, "Jorge Flores");
        }
        [TestMethod]
        public void Test_Get_Ordertime()
        {
            var library = new LibraryRepository();
            var mapper = new Mapper();
            var order = new OrderService(library, mapper);
            var result = order.GetOrder(1);
            Assert.IsNotNull(result.OrderTime);
        }
        /*[TestMethod]
        public void Test_Create_Order()
        {
            List<OrderEntity> Orders = new List<OrderModel>() { new OrderModel() { ClientName = "Pepito Perez", OrderTime = new DateTime(2021, 11, 15) } };
            var library = new LibraryRepository();
            var mapper = new Mapper();
            var order = new OrderService(library, mapper);
            var result = order.CreateOrder(Orders);
            Assert.IsNotNull(result.OrderTime);
        }*/
        [TestMethod]
        public void Test_Delete_Order()
        {
            var library = new LibraryRepository();
            var mapper = new Mapper();
            var order = new OrderService(library, mapper);
            var result = order.DeleteOrder(2);
            Assert.IsTrue(result);
        }
        [TestMethod]
        public void Test_Get_Orders()
        {
            var library = new LibraryRepository();
            var mapper = new Mapper();
            var order = new OrderService(library, mapper);
            var result = order.GetOrders();
            Assert.IsNotNull(result);
        }
    }
}