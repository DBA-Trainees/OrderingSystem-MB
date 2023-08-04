using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderSystem.Entities
{
    public class FoodType:FullAuditedEntity<int>
    {
        public string FoodTypeName { get; set; }
    }
}
