﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using WebApp.Models;

namespace WebApp.Persistence.Repository
{
    public interface IUserRepository : IRepository<ApplicationUser, string>
    {
        bool Register(ApplicationUser user);
        bool Login(string username, string password);
        ApplicationUser GetUserByUsername(string username);
        bool UpdateUser(ApplicationUser updateUser);
        ApplicationUser GetUserByEmail(string email);
        IEnumerable<UserDataBindingModel> GetAllAppUsers();
        bool SetVerificationStatus(string username, VerificationStatus status, out string email);
        bool AddUserDocument(string username, string docPath);
        string GetUserDocument(string username);
        CustomerType GetCustomerType(string username);
    }
}