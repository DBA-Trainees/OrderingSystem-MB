using Abp.AutoMapper;
using OrderSystem.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderSystem.Categories.Dto
{
    [AutoMapTo(typeof(Category))]
    public class CreateCategoriesDto
    {
        public string CategoryName { get; set; }
    }
}
