using Abp.Application.Services;
using OrderSystem.Categories.Dto;
using OrderSystem.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderSystem.Categories
{
    public interface ICategoriesAppService: IAsyncCrudAppService< CategoriesDto, int, PagedCategoriesResultRequestDto, CreateCategoriesDto, CategoriesDto>
    {
        Task<List<CategoriesDto>> GetAllCategories();
    }
}
