using Abp.Application.Services;
using Abp.Application.Services.Dto;
using OrderSystem.Entities;
using OrderSystem.Orders.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderSystem.Orders
{
    public interface IOrderAppService: IAsyncCrudAppService < OrderDto, int, PagedOrderResultRequestDto, CreateOrderDto, OrderDto>
    {
        Task<List<OrderDto>> GetAllOrders();
       Task<PagedResultDto<OrderDto>> GetAllOrderWithFoodAndCustomers(PagedOrderResultRequestDto input);
        
        Task<Order> GetAllStatus(int id);


    }
}
