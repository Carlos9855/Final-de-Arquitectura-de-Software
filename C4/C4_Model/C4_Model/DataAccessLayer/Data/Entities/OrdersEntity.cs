using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace C4_Model.Data.Entities
{
    public class OrderEntity
    {
        public int Id { get; set; }
        public string ClientName { get; set; }
        public DateTime? OrderTime { get; set; }
        public enum TypeOfOrder { inPlace, takeAway };
        public TypeOfOrder? OrderType { get; set; }
    }
}
