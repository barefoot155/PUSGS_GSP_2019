namespace WebApp.Migrations
{
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using WebApp.Models;

    internal sealed class Configuration : DbMigrationsConfiguration<WebApp.Persistence.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(WebApp.Persistence.ApplicationDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data.

            //Discount
            //if(!context.Discounts.Any(d=>d.CustomerType==CustomerType.Student))
            var disc1 = new Discount() { Id = 1, Coefficient = (float)0.8, CustomerType = CustomerType.Student };
           
            //if (!context.Discounts.Any(d => d.CustomerType == CustomerType.Pensioner))
            var disc2 = new Discount() { Id = 2, Coefficient = (float)0.5, CustomerType = CustomerType.Pensioner };
           
            //if (!context.Discounts.Any(d => d.CustomerType == CustomerType.Regular))
            var disc3 = new Discount() { Id = 3, Coefficient = 1, CustomerType = CustomerType.Regular };

            context.Discounts.AddOrUpdate(a => a.Id, disc1);
            context.Discounts.AddOrUpdate(a => a.Id, disc2);
            context.Discounts.AddOrUpdate(a => a.Id, disc3);

            context.SaveChanges();

            //Items
            //if (!context.Items.Any(i => i.Type == TicketType.HourlyTicket))

            var item1 = new Item() { Id = 1, Type = TicketType.HourlyTicket };
            var item2 = new Item() { Id = 2, Type = TicketType.DailyTicket };
            var item3 = new Item() { Id = 3, Type = TicketType.MothlyTicket };
            var item4 = new Item() { Id = 4, Type = TicketType.AnnualTicket };


            context.Items.AddOrUpdate(a => a.Id, item1);
            //if (!context.Items.Any(i => i.Type == TicketType.DailyTicket))
            context.Items.AddOrUpdate(a => a.Id, item2);
            //if (!context.Items.Any(i => i.Type == TicketType.MothlyTicket))
            context.Items.AddOrUpdate(a => a.Id, item3);
            //if (!context.Items.Any(i => i.Type == TicketType.AnnualTicket))
            context.Items.AddOrUpdate(a => a.Id, item4);

            context.SaveChanges();

            //Pricelists
            //if (!context.Pricelists.Any(p => p.IsActive))
            var prList = new Pricelist() { Id = 1, IsActive = true, StartDate = DateTime.Now, EndDate = new DateTime(2020, 5, 30) };
            context.Pricelists.AddOrUpdate(a => a.Id, prList);

            context.SaveChanges();

            //Pricelist_items
            var pricelistItem1 = new Pricelist_Item() { Id = 1, ItemId = context.Items.Find(item1.Id).Id, PricelistId = context.Pricelists.Find(prList.Id).Id, Price = 65 };
            var pricelistItem2 = new Pricelist_Item() { Id = 2, ItemId = context.Items.Find(item2.Id).Id, PricelistId = context.Pricelists.Find(prList.Id).Id, Price = 300 };
            var pricelistItem3 = new Pricelist_Item() { Id = 3, ItemId = context.Items.Find(item3.Id).Id, PricelistId = context.Pricelists.Find(prList.Id).Id, Price = 1000 };
            var pricelistItem4 = new Pricelist_Item() { Id = 4, ItemId = context.Items.Find(item4.Id).Id, PricelistId = context.Pricelists.Find(prList.Id).Id, Price = 6000 };

            context.Pricelist_Items.AddOrUpdate(p => p.Id, pricelistItem1);
            context.Pricelist_Items.AddOrUpdate(p => p.Id, pricelistItem2);
            context.Pricelist_Items.AddOrUpdate(p => p.Id, pricelistItem3);
            context.Pricelist_Items.AddOrUpdate(p => p.Id, pricelistItem4);

            context.SaveChanges();

            //Lines
            //if (!context.Lines.Any(s => s.Number == 7))

            var line = new Line() { Id = 1, Number = 7 };
            context.Lines.AddOrUpdate(a => a.Id, line);

            context.SaveChanges();

            //Schedules
            //if (!context.Schedules.Any(s => s.Day == DayOfWeek.Monday))

            var sch = new Schedule() { Id = 1, Day = DayOfWeek.Monday, LineId = context.Lines.Find(1).Id };
            context.Schedules.AddOrUpdate(a => a.Id, sch);

            context.SaveChanges();

            if (!context.Roles.Any(r => r.Name == "Admin"))
            {
                var store = new RoleStore<IdentityRole>(context);
                var manager = new RoleManager<IdentityRole>(store);
                var role = new IdentityRole { Name = "Admin" };

                manager.Create(role);
            }

            if (!context.Roles.Any(r => r.Name == "Controller"))
            {
                var store = new RoleStore<IdentityRole>(context);
                var manager = new RoleManager<IdentityRole>(store);
                var role = new IdentityRole { Name = "Controller" };

                manager.Create(role);
            }

            if (!context.Roles.Any(r => r.Name == "AppUser"))
            {
                var store = new RoleStore<IdentityRole>(context);
                var manager = new RoleManager<IdentityRole>(store);
                var role = new IdentityRole { Name = "AppUser" };

                manager.Create(role);
            }

            var userStore = new UserStore<ApplicationUser>(context);
            var userManager = new UserManager<ApplicationUser>(userStore);

            if (!context.Users.Any(u => u.UserName == "admin@yahoo.com"))
            {
                var user = new ApplicationUser() { Id = "admin", UserName = "admin@yahoo.com", Email = "admin@yahoo.com", PasswordHash = ApplicationUser.HashPassword("Admin123!") };
                userManager.Create(user);
                userManager.AddToRole(user.Id, "Admin");
            }

            if (!context.Users.Any(u => u.UserName == "appu@yahoo.com"))
            { 
                var user = new ApplicationUser() { Id = "appu", UserName = "appu@yahoo.com", Email = "appu@yahoo.com", PasswordHash = ApplicationUser.HashPassword("Appu123!") };
                userManager.Create(user);
                userManager.AddToRole(user.Id, "AppUser");
            }
        }
    }
}
