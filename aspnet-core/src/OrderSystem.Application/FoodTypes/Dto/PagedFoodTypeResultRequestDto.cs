using Abp.Application.Services.Dto;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderSystem.FoodTypes.Dto
{
    public class PagedFoodTypeResultRequestDto: PagedResultRequestDto
    {
        public string Keyword { get; set; }
        public  bool? IsActive { get; set; }
    }
}
