using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using OrderSystem.Authorization;

namespace OrderSystem
{
    [DependsOn(
        typeof(OrderSystemCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class OrderSystemApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<OrderSystemAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(OrderSystemApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}
