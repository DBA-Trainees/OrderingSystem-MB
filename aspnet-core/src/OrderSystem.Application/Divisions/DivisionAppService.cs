using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using OrderSystem.Authorization;
using OrderSystem.Divisions.Dto;
using OrderSystem.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderSystem.Divisions
{
    [AbpAuthorize(PermissionNames.Pages_Divisions_Admin)]
    public class DivisionAppService : AsyncCrudAppService<Division, DivisionDto, int, PagedDivisionResultRequestDto, CreateDivisionDto, DivisionDto>, IDivisionAppService
    {
       
        private readonly IRepository<Division, int> _repository;
        public DivisionAppService(IRepository<Division, int> repository) : base(repository)
        {
            _repository = repository;
        }
        public override Task<DivisionDto> CreateAsync(CreateDivisionDto input)
        {
            return base.CreateAsync(input);
        }

        public override Task DeleteAsync(EntityDto<int> input)
        {
            return base.DeleteAsync(input);
        }

        public override Task<PagedResultDto<DivisionDto>> GetAllAsync(PagedDivisionResultRequestDto input)
        {
            return base.GetAllAsync(input);
        }

        public override Task<DivisionDto> GetAsync(EntityDto<int> input)
        {
            return base.GetAsync(input);
        }

        public override Task<DivisionDto> UpdateAsync(DivisionDto input)
        {
            return base.UpdateAsync(input);
        }

        public async Task<List<DivisionDto>> GetAllDivisions()
        {
            var returnQuery = await _repository
                .GetAll()
                .Select(x => ObjectMapper.Map<DivisionDto>(x))
                .ToListAsync();
            return returnQuery;
        }
    }
}
