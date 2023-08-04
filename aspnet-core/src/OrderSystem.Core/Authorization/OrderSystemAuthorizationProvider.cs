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

            var admin = context.GetPermissionOrNull(PermissionNames.Pages_Admin) ?? context.CreatePermission(PermissionNames.Pages_Admin, L("AdminView"));
            admin.CreateChildPermission(PermissionNames.Pages_Divisions_Admin, L("Divisions"));
             admin.CreateChildPermission(PermissionNames.Pages_Customers_Admin, L("Customers"));


            var vendor = context.GetPermissionOrNull(PermissionNames.Pages_Vendor) ?? context.CreatePermission(PermissionNames.Pages_Vendor, L("VendorsView"));
            vendor.CreateChildPermission(PermissionNames.Pages_Categories_Vendor, L("Category"));
            vendor.CreateChildPermission(PermissionNames.Pages_FoodTypes_Vendor, L("FoodTypes"));
            vendor.CreateChildPermission(PermissionNames.Pages_Foods_Vendor, L("Foods"));
            vendor.CreateChildPermission(PermissionNames.Pages_Orders_Vendor, L("Orders"));
           

            var customer = context.GetPermissionOrNull(PermissionNames.Pages_Customer) ?? context.CreatePermission(PermissionNames.Pages_Customer, L("CustomersView"));
            customer.CreateChildPermission(PermissionNames.Pages_FoodList_Customer, L("FoodList"));
          
         
        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, OrderSystemConsts.LocalizationSourceName);
        }
    }
}
