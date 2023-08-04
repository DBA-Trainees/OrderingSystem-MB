using Abp.Application.Services;
using OrderSystem.Divisions.Dto;
using OrderSystem.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderSystem.Divisions
{
    public interface IDivisionAppService: IAsyncCrudAppService< DivisionDto, int, PagedDivisionResultRequestDto, CreateDivisionDto, DivisionDto>
    {
        Task<List<DivisionDto>> GetAllDivisions();
    }
}
