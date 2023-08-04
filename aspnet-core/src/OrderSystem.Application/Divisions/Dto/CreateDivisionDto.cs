using Abp.AutoMapper;
using OrderSystem.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderSystem.Divisions.Dto
{
    [AutoMapTo(typeof(Division))]
    public class CreateDivisionDto
    {
        public string DivisionName { get; set; } 
    }
}
