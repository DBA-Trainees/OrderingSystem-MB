using System.Threading.Tasks;
using Abp.Application.Services;
using OrderSystem.Authorization.Accounts.Dto;

namespace OrderSystem.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
