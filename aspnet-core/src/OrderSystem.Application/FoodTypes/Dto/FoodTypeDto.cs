using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using OrderSystem.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderSystem.FoodTypes.Dto
{
    [AutoMapFrom(typeof(FoodType))]
    [AutoMapTo(typeof(FoodType))]
    
    public class FoodTypeDto:EntityDto<int>
    {
        public string FoodTypeName { get; set; }
    }
}
