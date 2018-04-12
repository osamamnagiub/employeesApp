using System;
using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;

namespace Workplace.Models
{
    public class EmployeesDbContext : DbContext
    {
        public EmployeesDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<Department> Departments { get; set; }
    }
}