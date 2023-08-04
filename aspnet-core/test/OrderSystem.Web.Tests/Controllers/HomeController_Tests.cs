using System.Threading.Tasks;
using OrderSystem.Models.TokenAuth;
using OrderSystem.Web.Controllers;
using Shouldly;
using Xunit;

namespace OrderSystem.Web.Tests.Controllers
{
    public class HomeController_Tests: OrderSystemWebTestBase
    {
        [Fact]
        public async Task Index_Test()
        {
            await AuthenticateAsync(null, new AuthenticateModel
            {
                UserNameOrEmailAddress = "admin",
                Password = "123qwe"
            });

            //Act
            var response = await GetResponseAsStringAsync(
                GetUrl<HomeController>(nameof(HomeController.Index))
            );

            //Assert
            response.ShouldNotBeNullOrEmpty();
        }
    }
}