using Abp.Application.Services;
using OrderSystem.Entities;
using OrderSystem.FoodTypes.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderSystem.FoodTypes
{
    public interface IFoodTypeAppService: IAsyncCrudAppService<FoodTypeDto, int, PagedFoodTypeResultRequestDto, CreateFoodTypeDto, FoodTypeDto>
    {
        Task<List<FoodTypeDto>> GetAllFoodType();
    }
}
