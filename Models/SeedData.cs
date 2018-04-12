using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Workplace.Models
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new EmployeesDbContext(
                serviceProvider.GetRequiredService<DbContextOptions<EmployeesDbContext>>()))
            {
                // Look for any movies.
                if (context.Employees.Any() && context.Departments.Any())
                {
                    return;   // DB has been seeded
                }

                Department[] departments = new Department[]{
                      new Department
                      {
                          Name = "Accounting"
                      },
                      new Department
                      {
                          Name = "Marketing"
                      }, new Department
                      {
                          Name = "Legal"
                      }
            };
                context.Departments.AddRange(
                    departments
                );

                context.Employees.AddRange(
                     new Employee
                     {
                         FirstName = "Ahmed",
                         LastName = "Mohamed",
                         DateOfBirth = new DateTime(1990, 12, 3),
                         Department = departments[0]
                     },

                     new Employee
                     {
                         FirstName = "Mohamed",
                         LastName = "Mostafa",
                         DateOfBirth = new DateTime(2000, 12, 7),
                         Department = departments[1]
                     },
                       new Employee
                       {
                           FirstName = "osama",
                           LastName = "Mohamed",
                           DateOfBirth = new DateTime(1980, 7, 3),
                           Department = departments[2]
                       },
                       new Employee
                       {
                           FirstName = "Hesham",
                           LastName = "Ali",
                           DateOfBirth = new DateTime(1970, 9, 5),
                           Department = departments[1]
                       }
                );
                context.SaveChanges();
            }
        }
    }
}