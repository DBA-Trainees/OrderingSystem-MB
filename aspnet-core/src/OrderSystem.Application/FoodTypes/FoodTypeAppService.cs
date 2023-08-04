using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using OrderSystem.Authorization;
using OrderSystem.Entities;
using OrderSystem.FoodTypes.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderSystem.FoodTypes
{
    [AbpAuthorize(PermissionNames.Pages_FoodTypes)]

    public class FoodTypeAppService : AsyncCrudAppService<FoodType, FoodTypeDto, int, PagedFoodTypeResultRequestDto, CreateFoodTypeDto, FoodTypeDto>, IFoodTypeAppService
    {
        private readonly IRepository<FoodType, int> _foodTypeRepository;
        public FoodTypeAppService(IRepository<FoodType, int> repository) : base(repository)
        {
            _foodTypeRepository= repository;
        }

        public override Task<FoodTypeDto> CreateAsync(CreateFoodTypeDto input)
        {
            return base.CreateAsync(input);
        }

        public override Task DeleteAsync(EntityDto<int> input)
        {
            return base.DeleteAsync(input);
        }

        public override Task<PagedResultDto<FoodTypeDto>> GetAllAsync(PagedFoodTypeResultRequestDto input)
        {
            return base.GetAllAsync(input);
        }

        public override Task<FoodTypeDto> GetAsync(EntityDto<int> input)
        {
            return base.GetAsync(input);
        }

        public override Task<FoodTypeDto> UpdateAsync(FoodTypeDto input)
        {
            return base.UpdateAsync(input);
        }

        public async Task<List<FoodTypeDto>> GetAllFoodType()
        {
            var returnQuery = await _foodTypeRepository
                .GetAll()
                .Select(x => ObjectMapper.Map<FoodTypeDto>(x))
                .ToListAsync();
            return returnQuery;
        }
    }
}
