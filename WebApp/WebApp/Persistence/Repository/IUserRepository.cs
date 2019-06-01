using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public interface IUserRepository : IRepository<ApplicationUser, string>
    {
        bool Register(ApplicationUser user);
        bool Login(string username, string password);
    }
}