using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using OrderSystem.Authorization.Roles;
using OrderSystem.Authorization.Users;
using OrderSystem.MultiTenancy;
using OrderSystem.Entities;

namespace OrderSystem.EntityFrameworkCore
{
    public class OrderSystemDbContext : AbpZeroDbContext<Tenant, Role, User, OrderSystemDbContext>
    {
        /* Define a DbSet for each entity of the application */
        
        public OrderSystemDbContext(DbContextOptions<OrderSystemDbContext> options)
            : base(options)
        {
        }
        public DbSet<Division>Divisions { get; set; }
        public DbSet<Category> Categories { get; set; }
       public DbSet<Customer> Customers { get; set; }
        public DbSet<FoodType> FoodTypes { get; set; }
        public DbSet<Food> Foods { get; set; }
        public DbSet<Order> Orders { get; set; }
    }
}
