using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Collections.Extensions;
using Abp.Domain.Repositories;
using Abp.Linq.Extensions;
using AutoMapper.Internal.Mappers;
using Microsoft.EntityFrameworkCore;
using OrderSystem.Authorization;
using OrderSystem.Customers.Dto;
using OrderSystem.Entities;
using OrderSystem.Foods.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderSystem.Foods
{
    [AbpAuthorize(PermissionNames.Pages_Foods)]

    public class FoodAppService : AsyncCrudAppService<Food, FoodDto, int, PagedFoodResultRequestDto, CreateFoodDto, FoodDto>, IFoodAppService
    {
        private readonly IRepository<Food, int> _foodRepository;
        public FoodAppService(IRepository<Food, int> repository) : base(repository)
        {
            _foodRepository = repository;
        }

        public override Task<FoodDto> CreateAsync(CreateFoodDto input)
        {
            return base.CreateAsync(input);
        }

        public override Task DeleteAsync(EntityDto<int> input)
        {
            return base.DeleteAsync(input);
        }

        public override Task<PagedResultDto<FoodDto>> GetAllAsync(PagedFoodResultRequestDto input)
        {
            return base.GetAllAsync(input);
        }

        public override Task<FoodDto> GetAsync(EntityDto<int> input)
        {
            return base.GetAsync(input);
        }

        public override Task<FoodDto> UpdateAsync(FoodDto input)
        {
            return base.UpdateAsync(input);
        }


        public async Task<List<FoodDto>> GetAllFoods()
        {
            var returnQuery = await _foodRepository
                .GetAll()
                .Select(x => ObjectMapper.Map<FoodDto>(x))
                .ToListAsync();
        return returnQuery;
        }

        //public async Task<PagedResultDto<FoodDto>> GetAllFoodWithCategoryAndFoodType(PagedFoodResultRequestDto input)
        //{
        //    var food = await _foodRepository
        //        .GetAll()
        //        .Include(x => x.Category)
        //        .Include(x => x.FoodType)
        //        .Select(x => ObjectMapper
        //        .Map<FoodDto>(x))
        //        .ToListAsync();
        //    return new PagedResultDto<FoodDto>(food.Count(), food);
        //}


        //public async Task<List<FoodDto>> GetAllFoodsAsync()
        //{
        //    var fuds = await _foodRepository.GetAllListAsync();
        //    return ObjectMapper.Map<List<FoodDto>>(fuds);
        //}


        public async Task<PagedResultDto<FoodDto>> GetAllFoodWithCategoryAndFoodType(PagedFoodResultRequestDto input)
        {
            var food = await _foodRepository
                .GetAll()
                .Include(x => x.Category).Include(x => x.FoodType)
                .Select(x => ObjectMapper.Map<FoodDto>(x))
                .ToListAsync();
            return new PagedResultDto<FoodDto>(food.Count, food);
        }

    }
}
