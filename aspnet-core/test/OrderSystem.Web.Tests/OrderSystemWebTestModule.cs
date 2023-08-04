using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using OrderSystem.EntityFrameworkCore;
using OrderSystem.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace OrderSystem.Web.Tests
{
    [DependsOn(
        typeof(OrderSystemWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class OrderSystemWebTestModule : AbpModule
    {
        public OrderSystemWebTestModule(OrderSystemEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(OrderSystemWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(OrderSystemWebMvcModule).Assembly);
        }
    }
}