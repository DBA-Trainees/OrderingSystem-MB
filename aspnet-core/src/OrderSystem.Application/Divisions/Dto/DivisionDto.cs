using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using OrderSystem.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderSystem.Divisions.Dto
{
    [AutoMapFrom(typeof(Division))]
    [AutoMapTo(typeof(Division))]
    public class DivisionDto: EntityDto<int>
    {
        public string DivisionName { get; set; }
    }
}
