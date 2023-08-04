using System.Threading.Tasks;
using OrderSystem.Configuration.Dto;

namespace OrderSystem.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
