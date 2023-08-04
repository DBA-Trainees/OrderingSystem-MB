using Abp.AutoMapper;
using OrderSystem.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderSystem.Customers.Dto
{
    [AutoMapTo(typeof(Customer))]
    public class CreateCustomerDto
    {
        public string CustomerName { get; set; }
        public int DivisionId { get; set; }
    }
}
