FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

WORKDIR /src
COPY ["src/OrderSystem.Web.Host/OrderSystem.Web.Host.csproj", "src/OrderSystem.Web.Host/"]
COPY ["src/OrderSystem.Web.Core/OrderSystem.Web.Core.csproj", "src/OrderSystem.Web.Core/"]
COPY ["src/OrderSystem.Application/OrderSystem.Application.csproj", "src/OrderSystem.Application/"]
COPY ["src/OrderSystem.Core/OrderSystem.Core.csproj", "src/OrderSystem.Core/"]
COPY ["src/OrderSystem.EntityFrameworkCore/OrderSystem.EntityFrameworkCore.csproj", "src/OrderSystem.EntityFrameworkCore/"]
WORKDIR "/src/src/OrderSystem.Web.Host"
RUN dotnet restore 

WORKDIR /src
COPY ["src/OrderSystem.Web.Host", "src/OrderSystem.Web.Host"]
COPY ["src/OrderSystem.Web.Core", "src/OrderSystem.Web.Core"]
COPY ["src/OrderSystem.Application", "src/OrderSystem.Application"]
COPY ["src/OrderSystem.Core", "src/OrderSystem.Core"]
COPY ["src/OrderSystem.EntityFrameworkCore", "src/OrderSystem.EntityFrameworkCore"]
WORKDIR "/src/src/OrderSystem.Web.Host"
RUN dotnet publish -c Release -o /publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:7.0
EXPOSE 80
WORKDIR /app
COPY --from=build /publish .
ENTRYPOINT ["dotnet", "OrderSystem.Web.Host.dll"]
