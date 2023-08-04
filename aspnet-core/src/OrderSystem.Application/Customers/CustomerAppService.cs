using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using OrderSystem.Authorization;
using OrderSystem.Customers.Dto;
using OrderSystem.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderSystem.Customers
{
    [AbpAuthorize(PermissionNames.Pages_Customers)]

    public class CustomerAppService : AsyncCrudAppService<Customer, CustomerDto, int, PagedCustomerResultRequestDto, CreateCustomerDto, CustomerDto>, ICustomerAppService
    {
        private readonly IRepository<Customer, int> _customerRepository;
        public CustomerAppService(IRepository<Customer, int> repository) : base(repository)
        {
            _customerRepository = repository;
        }

        public override Task<CustomerDto> CreateAsync(CreateCustomerDto input)
        {
            return base.CreateAsync(input);
        }

        public override Task DeleteAsync(EntityDto<int> input)
        {
            return base.DeleteAsync(input);
        }

        public override Task<PagedResultDto<CustomerDto>> GetAllAsync(PagedCustomerResultRequestDto input)
        {
            return base.GetAllAsync(input);
        }

        public override Task<CustomerDto> GetAsync(EntityDto<int> input)
        {
            return base.GetAsync(input);
        }

        public override Task<CustomerDto> UpdateAsync(CustomerDto input)
        {
            return base.UpdateAsync(input);
        }

        public async Task<List<CustomerDto>> GetAllCustomer()
        {
            var returnQuery = await _customerRepository
                 .GetAll()
                 .Select(x => ObjectMapper.Map<CustomerDto>(x))
                 .ToListAsync();
            return returnQuery;
        }
        public async Task<PagedResultDto<CustomerDto>> GetAllCustomerWithDivision(PagedCustomerResultRequestDto input)
        {
            var customer = await _customerRepository
                .GetAll()
                .Include(x => x.Division)
                .Select(x => ObjectMapper.Map<CustomerDto>(x))
                .ToListAsync();
            return new PagedResultDto<CustomerDto>(customer.Count, customer);
        }

    }
}
