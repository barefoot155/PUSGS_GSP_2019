using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public class UserRepository : Repository<ApplicationUser, string>, IUserRepository
    {
        protected ApplicationDbContext AppDbContext { get { return context as ApplicationDbContext; } }

        public UserRepository(DbContext context) : base(context)
        {

        }

        public bool Register(ApplicationUser user)
        {
            var userStore = new UserStore<ApplicationUser>(context);
            var userManager = new UserManager<ApplicationUser>(userStore);

            if (!AppDbContext.Users.Any(u=>u.Email==user.Email || u.UserName == user.UserName))
            {
                userManager.Create(user);
                userManager.AddToRole(user.Id, "AppUser");

                context.SaveChanges();

                return true;
            }
            else
            {
                return false;
            }
        }

        public bool Login(string username, string password)
        {

            foreach (var user in AppDbContext.Users)
            {
                if ((user.UserName == username || user.Email == username) && ApplicationUser.VerifyHashedPassword(user.PasswordHash, password))
                    return true;
            }

            return false;
        }

        public ApplicationUser GetUserByUsername(string username)
        {
            return AppDbContext.Users.Single(u => u.UserName == username);
        }
    }
}