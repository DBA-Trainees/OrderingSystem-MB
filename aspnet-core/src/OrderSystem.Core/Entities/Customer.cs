using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderSystem.Entities
{
    public class Customer: FullAuditedEntity<int>
    {
        public string CustomerName { get; set; }
        public int DivisionId { get; set; }
        public Division Division{ get; set;}
    }
}
