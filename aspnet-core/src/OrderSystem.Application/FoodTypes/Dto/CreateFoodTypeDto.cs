using Abp.AutoMapper;
using OrderSystem.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderSystem.FoodTypes.Dto
{
    [AutoMapTo(typeof(FoodType))]
    public class CreateFoodTypeDto
    {
        public string FoodTypeName { get; set; }
    }
}
