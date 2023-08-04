using System.Threading.Tasks;
using Abp.Application.Services;
using OrderSystem.Sessions.Dto;

namespace OrderSystem.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
