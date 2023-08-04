using Abp.Application.Services;
using Abp.Application.Services.Dto;
using OrderSystem.Entities;
using OrderSystem.Foods.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderSystem.Foods
{
    public interface IFoodAppService : IAsyncCrudAppService<FoodDto, int, PagedFoodResultRequestDto, CreateFoodDto, FoodDto>
    {
        Task<List<FoodDto>> GetAllFoods();
        Task<PagedResultDto<FoodDto>> GetAllFoodWithCategoryAndFoodType(PagedFoodResultRequestDto input);
       // Task<List<FoodDto>> GetAllFoodsAsync();
    }
}
