using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using OrderSystem.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderSystem.Categories.Dto
{
    [AutoMapFrom(typeof(Category))]
    [AutoMapTo(typeof(Category))]

    public class CategoriesDto: EntityDto<int>
    {
        public string CategoryName { get; set; }
    }
}
