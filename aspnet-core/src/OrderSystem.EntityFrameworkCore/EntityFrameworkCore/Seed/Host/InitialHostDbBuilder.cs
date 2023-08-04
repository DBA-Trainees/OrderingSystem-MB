namespace OrderSystem.EntityFrameworkCore.Seed.Host
{
    public class InitialHostDbBuilder
    {
        private readonly OrderSystemDbContext _context;

        public InitialHostDbBuilder(OrderSystemDbContext context)
        {
            _context = context;
        }

        public void Create()
        {
            new DefaultEditionCreator(_context).Create();
            new DefaultLanguagesCreator(_context).Create();
            new HostRoleAndUserCreator(_context).Create();
            new DefaultSettingsCreator(_context).Create();

            _context.SaveChanges();
        }
    }
}
