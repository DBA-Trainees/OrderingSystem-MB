using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using OrderSystem.Customers.Dto;
using OrderSystem.Entities;
using OrderSystem.Foods.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderSystem.Orders.Dto
{
    [AutoMapTo(typeof(Order))]
    [AutoMapFrom(typeof(OrderDto))]
    public class CreateOrderDto : EntityDto<int>
    {
        public int? CustomerId { get; set; }
        public int? FoodId { get; set; }
        public string? Status { get; set; }
        public int? Quantity { get; set; }
        public double TotalFoodAmount { get; set; }
        public string? Size { get; set; }
        public string? Notes { get; set; }
        public DateTime? DateTimeOrdered { get; set; }
        public int totalSales { get; set; }

    }
}
