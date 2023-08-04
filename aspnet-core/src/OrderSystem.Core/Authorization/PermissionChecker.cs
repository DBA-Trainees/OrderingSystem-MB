using Abp.Authorization;
using OrderSystem.Authorization.Roles;
using OrderSystem.Authorization.Users;

namespace OrderSystem.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
