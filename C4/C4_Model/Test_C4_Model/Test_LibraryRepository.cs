using C4_Model.Data.Entities;
using C4_Model.Data.Repository;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;

namespace Test_C4_Model
{
    [TestClass]
    public class Test_LibraryRepository
    {
        [TestMethod]
        public void Test_Get_CLientName()
        {
            var list = new List<OrderEntity>(){new OrderEntity(){Id=1,ClientName="Jorge Flores",OrderTime=new DateTime(2021,05,30)}};
            var library = new LibraryRepository ();
            var result = library.GetOrder(1);
            Assert.AreEqual(result.ClientName, "Jorge Flores");
        }
        [TestMethod]
        public void Test_Get_Ordertime()
        {
            var library = new LibraryRepository();
            var result = library.GetOrder(1);
            Assert.IsNotNull(result.OrderTime);
        }
        /*[TestMethod]
        public void Test_Create_Order()
        {
            List<OrderEntity> Orders = new List<OrderEntity>() { new OrderEntity() { ClientName = "Pepito Perez", OrderTime = new DateTime(2021, 11, 15) } };
            var library = new LibraryRepository();
            var result = library.CreateOrder(Orders);
            Assert.IsNotNull(result.OrderTime);
        }*/
        [TestMethod]
        public void Test_Delete_Order()
        {
            var library = new LibraryRepository();
            var result = library.DeleteOrder(2);
            Assert.IsTrue(result);
        }
        [TestMethod]
        public void Test_Get_Orders()
        {
            var library = new LibraryRepository();
            var result = library.GetOrders();
            Assert.IsNotNull(result);
        }
    }
}