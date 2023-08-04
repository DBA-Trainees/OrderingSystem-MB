using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace OrderSystem.EntityFrameworkCore
{
    public static class OrderSystemDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<OrderSystemDbContext> builder, string connectionString)
        {
            builder.UseSqlServer(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<OrderSystemDbContext> builder, DbConnection connection)
        {
            builder.UseSqlServer(connection);
        }
    }
}
