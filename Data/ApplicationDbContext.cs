using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using ReportingApp.Models;
using ReportingApp.Models.UserManagement;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ReportingApp.Data
{
    public class ApplicationDbContext : DbContext// IdentityDbContext<AppUser, AppRole, int>
    {
        string ConnectionString = "";
        public ApplicationDbContext()
        {

        }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<CancelledSubscription> CancelledSubscriptions { get; set; }
        public virtual DbSet<PaymentGatewayDetail> PaymentGatewayDetails { get; set; }
        public virtual DbSet<ComponentRight> ComponentRights { get; set; }
        public virtual DbSet<PackagePlan> PackagePlans { get; set; }
        public virtual DbSet<ErrorLog> ErrorLogs { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            ConnString();
            // optionsBuilder.UseMySql("Server=95.217.238.99;Uid=root;Pwd=MaskeenBichara@321;database=SonaBusiness")
            //  optionsBuilder.UseMySql("Server=185.62.69.92;Uid=live;Pwd=2Gw#wKnHSHm77X!8Pe;database=SonaBusiness")
            optionsBuilder.UseMySql(ConnectionString)
             .UseLoggerFactory(LoggerFactory.Create(b => b
                .AddConsole()
                .AddFilter(level => level > LogLevel.Information)))
                .EnableSensitiveDataLogging()
                .EnableDetailedErrors();
        }
        public string ConnString()
        {
            try
            {
                var configurationBuilder = new ConfigurationBuilder();
                string path = Path.Combine(Directory.GetCurrentDirectory(), "appsettings.json");
                configurationBuilder.AddJsonFile(path, false);
                ConnectionString = configurationBuilder.Build().GetSection("ConnectionStrings:DefaultConnection").Value;
            }
            catch (Exception ex)
            {

            }

            return ConnectionString;
        }
    }
}
