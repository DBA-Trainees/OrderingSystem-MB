using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace OrderSystem.Entities
{
    public class Order: FullAuditedEntity<int>
    {
        public int? CustomerId { get; set; }
        public Customer Customer { get; set; }
        public int? FoodId { get; set; }
        public Food Food { get; set; }
        public int? Quantity { get; set; }
        public double Price { get; set; }
        public string Size { get; set; }
        public string? Notes { get; set; }
        public DateTime? DateTimeOrdered { get; set; }
    }
}
