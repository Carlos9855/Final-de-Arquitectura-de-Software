using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace C4_Model.Models
{
    public class OrderModel
    {
        public int Id { get; set; }
        public string ClientName { get; set; }
        public DateTime? OrderTime { get; set; }
        public enum TypeOfOrder { inPlace, takeAway };
        public TypeOfOrder? OrderType { get; set; }
    }
}
