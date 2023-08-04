using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using OrderSystem.Configuration;

namespace OrderSystem.Web.Host.Startup
{
    [DependsOn(
       typeof(OrderSystemWebCoreModule))]
    public class OrderSystemWebHostModule: AbpModule
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public OrderSystemWebHostModule(IWebHostEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(OrderSystemWebHostModule).GetAssembly());
        }
    }
}
