using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using OrderSystem.Configuration.Dto;

namespace OrderSystem.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : OrderSystemAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
