using Abp.Authorization;
using Abp.Localization;
using Abp.MultiTenancy;

namespace OrderSystem.Authorization
{
    public class OrderSystemAuthorizationProvider : AuthorizationProvider
    {
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            context.CreatePermission(PermissionNames.Pages_Users, L("Users"));
            context.CreatePermission(PermissionNames.Pages_Users_Activation, L("UsersActivation"));
            context.CreatePermission(PermissionNames.Pages_Roles, L("Roles"));
            context.CreatePermission(PermissionNames.Pages_Tenants, L("Tenants"), multiTenancySides: MultiTenancySides.Host);

            context.CreatePermission(PermissionNames.Pages_Divisions, L("Divisions"));
            context.CreatePermission(PermissionNames.Pages_Customers, L("Customers"));
            context.CreatePermission(PermissionNames.Pages_Categories, L("Category"));
            context.CreatePermission(PermissionNames.Pages_FoodTypes, L("FoodTypes"));
            context.CreatePermission(PermissionNames.Pages_Foods, L("Foods"));
            context.CreatePermission(PermissionNames.Pages_Orders, L("Orders"));
            //context.CreatePermission(PermissionNames.Pages_FoodList, L("FoodList"));


        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, OrderSystemConsts.LocalizationSourceName);
        }
    }
}
