using Abp.Application.Services;
using Abp.Application.Services.Dto;
using OrderSystem.Customers.Dto;
using OrderSystem.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderSystem.Customers
{
    public interface ICustomerAppService: IAsyncCrudAppService<CustomerDto, int, PagedCustomerResultRequestDto, CreateCustomerDto, CustomerDto>
    {
        Task<List<CustomerDto>> GetAllCustomer();
        Task<PagedResultDto<CustomerDto>> GetAllCustomerWithDivision(PagedCustomerResultRequestDto input);
    }
}
