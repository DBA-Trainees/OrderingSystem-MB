using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderSystem.Entities
{
    public class Category:FullAuditedEntity<int>
    {
        public string CategoryName { get; set; }
    }
}
