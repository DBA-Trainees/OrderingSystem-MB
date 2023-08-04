using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using OrderSystem.Authorization;
using OrderSystem.Categories.Dto;
using OrderSystem.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderSystem.Categories
{
    [AbpAuthorize(PermissionNames.Pages_Categories)]

    public class CategoriesAppService : AsyncCrudAppService<Category, CategoriesDto, int, PagedCategoriesResultRequestDto, CreateCategoriesDto, CategoriesDto>, ICategoriesAppService
    {
        private readonly IRepository<Category, int> _categoryRepository;
        public CategoriesAppService(IRepository<Category, int> repository) : base(repository)
        {
            _categoryRepository = repository;
        }

        public override Task<CategoriesDto> CreateAsync(CreateCategoriesDto input)
        {
            return base.CreateAsync(input);
        }

        public override Task DeleteAsync(EntityDto<int> input)
        {
            return base.DeleteAsync(input);
        }

        public override Task<PagedResultDto<CategoriesDto>> GetAllAsync(PagedCategoriesResultRequestDto input)
        {
            return base.GetAllAsync(input);
        }

        public override Task<CategoriesDto> GetAsync(EntityDto<int> input)
        {
            return base.GetAsync(input);
        }

        public override Task<CategoriesDto> UpdateAsync(CategoriesDto input)
        {
            return base.UpdateAsync(input);
        }
        public async Task<List<CategoriesDto>> GetAllCategories()
        {
            var returnQuery = await _categoryRepository
                .GetAll()
                .Select(x => ObjectMapper.Map<CategoriesDto>(x))
                .ToListAsync();
                return returnQuery;
        }
    }
}
