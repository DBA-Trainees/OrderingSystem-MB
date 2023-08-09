using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using OrderSystem.Customers.Dto;
using OrderSystem.Entities;
using OrderSystem.Foods.Dto;
using OrderSystem.Users.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderSystem.Orders.Dto
{
    [AutoMapFrom(typeof(Order))]
    [AutoMapTo(typeof(Order))]
    public class OrderDto: EntityDto<int>
    {
        public int? FoodId { get; set; }
        public FoodDto Food { get; set; }
        public int Quantity { get; set; }
        public double TotalFoodAmount { get; set; }
        public string? Size { get; set; }        
        public string? Notes { get; set; }
        public DateTime? DateTimeOrdered { get; set; }

    }
}

