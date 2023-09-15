using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.Runtime.Session;
using Abp.UI;
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
  
    public class OrderAppService : AsyncCrudAppService<Order, OrderDto, int, PagedOrderResultRequestDto, CreateOrderDto, OrderDto>, IOrderAppService
    {
        private readonly IRepository<Order, int> _orderRepository;
        private readonly IRepository<Food, int> _foodRepository;
        public OrderAppService(IRepository<Order, int> repository, IRepository<Food, int> foodRepository) : base(repository)
        {
            _orderRepository = repository;
            _foodRepository = foodRepository;
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
        public async Task<OrderDto> CreateOrUpdate(OrderDto input)
        {
            var notexisting = ObjectMapper.Map<Order>(input);
            var orderEx = await _orderRepository.GetAll().AsNoTracking()
                .Where(x => x.FoodId == input.FoodId)
                .FirstOrDefaultAsync();

            try
            {
                if (orderEx == null)
                {
                    notexisting.DateTimeOrdered = input.DateTimeOrdered?.ToLocalTime();
                    await _orderRepository.InsertAsync(notexisting);
                    return ObjectMapper.Map<OrderDto>(notexisting);
                }
                else
                {
                    orderEx.Quantity += input.Quantity;
                    orderEx.DateTimeOrdered = input.DateTimeOrdered?.ToLocalTime();
                    await _orderRepository.UpdateAsync(orderEx);
                    return ObjectMapper.Map<OrderDto>(orderEx);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        //public async Task<OrderDto> CreateOrUpdate(OrderDto input)
        //{
        //    var notexisting = ObjectMapper.Map<Order>(input);
        //    var orderEx = await _orderRepository.FirstOrDefaultAsync(x => x.FoodId == input.FoodId);


        //    try
        //    {
        //        if (orderEx == null)
        //        {
        //            var food = await _foodRepository.GetAsync(notexisting.FoodId);

        //            notexisting.DateTimeOrdered = input.DateTimeOrdered?.ToLocalTime();
        //            await _orderRepository.InsertAsync(notexisting);
        //            food.Quantity -= notexisting.Quantity;


        //            // Update the food quantity when creating a new order
        //            var foodItem = await _foodRepository.GetAsync(input.Id);
        //            if (foodItem != null)
        //            {
        //                if (foodItem.Quantity >= input.Quantity)
        //                {
        //                    foodItem.Quantity -= input.Quantity;
        //                    await _foodRepository.UpdateAsync(foodItem);
        //                }
        //                else
        //                {
        //                    // Handle not enough items in stock
        //                    throw new UserFriendlyException("Not enough items in stock.");
        //                }
        //            }
        //            else
        //            {
        //                // Handle invalid food item
        //                throw new UserFriendlyException("Invalid food item.");
        //            }

        //            return ObjectMapper.Map<OrderDto>(notexisting);
        //        }
        //        else
        //        {
        //            orderEx.Quantity += input.Quantity;
        //            orderEx.DateTimeOrdered = input.DateTimeOrdered?.ToLocalTime();
        //            await _orderRepository.UpdateAsync(orderEx);

        //            // Update the food quantity when updating an order
        //            var foodItem = await _foodRepository.GetAsync(input.Id);
        //            if (foodItem != null)
        //            {
        //                if (foodItem.Quantity >= input.Quantity)
        //                {
        //                    foodItem.Quantity -= input.Quantity;
        //                    await _foodRepository.UpdateAsync(foodItem);
        //                }
        //                else
        //                {
        //                    // Handle not enough items in stock
        //                    throw new UserFriendlyException("Not enough items in stock.");
        //                }
        //            }
        //            else
        //            {

        //                throw new UserFriendlyException("Invalid food item.");
        //            }

        //            return ObjectMapper.Map<OrderDto>(orderEx);
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}




        public async Task<PagedResultDto<OrderDto>> GetAllOrderWithFoodAndCustomers(PagedOrderResultRequestDto input)
        {
            var order= await _orderRepository
                .GetAll()
                .Include(x=> x.Customer)
                .Include(x => x.Food)
                .ThenInclude(x=>x.Category)
                .Select(x =>ObjectMapper.Map<OrderDto>(x))
                .ToListAsync();

            return new PagedResultDto<OrderDto>(order.Count,order);
        }
      

        public async Task<Order> GetAllStatus(int id)
        {
            var orderStatus = await _orderRepository.GetAll()
                .Include(x => x.Food)
                .Where(x => x.Food.Id == id)
                .Select(x => ObjectMapper.Map<Order>(x))
                .FirstOrDefaultAsync();

            return orderStatus;

        }
        public async Task<double> GetTotalSalesByDateAsync(int year, int month, int day)
        {
            // Calculate the start and end of the specified day
            DateTime startDate = new DateTime(year, month, day, 0, 0, 0);
            DateTime endDate = new DateTime(year, month, day, 23, 59, 59);

            // Query the database to sum the total sales within the specified date range
            var Sales = await _orderRepository
                .GetAll()
                .Where(x => x.DateTimeOrdered >= startDate && x.DateTimeOrdered <= endDate)
                .Select(x => ObjectMapper.Map<Order>(x))
                .SumAsync(x => x.totalSales);

            return Sales;
        }



    }

}
