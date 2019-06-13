using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
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

        public bool UpdateUser(ApplicationUser updateUser)
        {
            var userStore = new UserStore<ApplicationUser>(context);
            var userManager = new UserManager<ApplicationUser>(userStore);

            IdentityResult result = userManager.Update(updateUser);

            return result.Succeeded;
        }

        public ApplicationUser GetUserByEmail(string email)
        {
            return AppDbContext.Users.FirstOrDefault(u=>u.Email == email);
        }

        public IEnumerable<UserDataBindingModel> GetAllAppUsers()
        {
            List<UserDataBindingModel> ret = new List<UserDataBindingModel>();
            var userStore = new UserStore<ApplicationUser>(context);
            var userManager = new UserManager<ApplicationUser>(userStore);

            foreach (var item in AppDbContext.Users.ToList())
            {
                if (userManager.GetRoles(item.Id).Contains("AppUser"))
                {
                    UserDataBindingModel temp = new UserDataBindingModel()
                    {
                        UserName = item.UserName,
                        Email = item.Email,
                        Name = item.Name,
                        Surname = item.Surname,
                        Address = item.Address,
                        DateOfBirth = item.DateOfBirth.ToString(),
                        PhoneNumber = item.PhoneNumber,
                        CustomerType = item.Type,
                        Status = item.Status
                    };

                    ret.Add(temp);
                }
            }

            return ret;
        }

        public bool SetVerificationStatus(string username, VerificationStatus status, out string email)
        {
            email = string.Empty;
            try
            {
                ApplicationUser user = GetUserByUsername(username);
                user.Status = status;
                AppDbContext.SaveChanges();
                email = user.Email;

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        public bool AddUserDocument(string username, string docPath)
        {
            foreach (ApplicationUser user in AppDbContext.Users.ToList())
            {
                if (user.UserName == username)
                {
                    user.DocumentPath = docPath;
                    user.Status = VerificationStatus.Processing;
                    AppDbContext.SaveChanges();

                    return true;
                }
            }

            return false;
        }

        public string GetUserDocument(string username)
        {
            return AppDbContext.Users.Single(x => x.UserName == username).DocumentPath;
        }

        public CustomerType GetCustomerType(string username)
        {
            return AppDbContext.Users.Single(u => u.UserName == username).Type;
        }
    }
}