using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace OrderSystem.Controllers
{
    public abstract class OrderSystemControllerBase: AbpController
    {
        protected OrderSystemControllerBase()
        {
            LocalizationSourceName = OrderSystemConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
