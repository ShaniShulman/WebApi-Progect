﻿using Entities;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace Repositories
{
    public class UserRepository : IUserRepository
    {
        ManagerDbContext _managerDbContext;

        public UserRepository(ManagerDbContext managerDbContext)
        {
            _managerDbContext = managerDbContext;
        }
        public async Task<User> GetById(int id)
        {
               return  await _managerDbContext.Users.FirstOrDefaultAsync(u => u.Id==id);
        }
        public async Task<User> PostLoginR(string username, string password)
        {
            return await _managerDbContext.Users.FirstOrDefaultAsync(u => u.UserName == username && u.Password == password);        
        }
        public async Task<User> Post(User newUser)
        {
           var user = await _managerDbContext.Users.AddAsync(newUser);
           await _managerDbContext.SaveChangesAsync();
           return user.Entity;
        }
        public async Task<User> Put(int id,User user1)
        {
            user1.Id = id;
            var result = _managerDbContext.Users.Update(user1);
            await _managerDbContext.SaveChangesAsync();
            return result.Entity;
        }
    }
}
