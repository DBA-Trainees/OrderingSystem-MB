using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using OrderSystem.Authorization;
using OrderSystem.Entities;
using OrderSystem.Orders.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderSystem.Orders
{
    [AbpAuthorize(PermissionNames.Pages_Orders)]
    public class OrderAppService : AsyncCrudAppService<Order, OrderDto, int, PagedOrderResultRequestDto, CreateOrderDto, OrderDto>, IOrderAppService
    {
        private readonly IRepository<Order, int> _orderRepository;
        public OrderAppService(IRepository<Order, int> repository) : base(repository)
        {
            _orderRepository = repository;
        }

        public override Task<OrderDto> CreateAsync(CreateOrderDto input)
        {
            return base.CreateAsync(input);
        }

        public override Task DeleteAsync(EntityDto<int> input)
        {
            return base.DeleteAsync(input);
        }

        public override Task<PagedResultDto<OrderDto>> GetAllAsync(PagedOrderResultRequestDto input)
        {
            return base.GetAllAsync(input);
        }

        public override Task<OrderDto> GetAsync(EntityDto<int> input)
        {
            return base.GetAsync(input);
        }

        public override Task<OrderDto> UpdateAsync(OrderDto input)
        {
            return base.UpdateAsync(input);
        }

        public async Task<List<OrderDto>> GetAllOrders()
        {
            var returnQuery= await _orderRepository
                .GetAll()
                .Select(x => ObjectMapper.Map<OrderDto>(x))
                .ToListAsync();

            return returnQuery;

        }

        public async Task<PagedResultDto<OrderDto>> GetAllOrderWithFoodAndCustomers(PagedOrderResultRequestDto input)
        {
            var order= await _orderRepository
                .GetAll()
                .Include(x => x.Food)
                .ThenInclude(x=>x.Category)
                .Include(x=>x.Customer)
                .Select(x =>ObjectMapper.Map<OrderDto>(x))
                .ToListAsync();

            return new PagedResultDto<OrderDto>(order.Count,order);
        }
    }
}
