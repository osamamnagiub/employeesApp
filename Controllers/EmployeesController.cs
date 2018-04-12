using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Workplace.Models;

namespace Workplace.Controllers
{
    [Route("/api/employees")]
    public class EmployeesController : Controller
    {
        private readonly EmployeesDbContext dbContext;

        public EmployeesController(EmployeesDbContext dbContext)
        {
            this.dbContext = dbContext;

        }


        [HttpGet("search/{term}")]
        public IActionResult Search(string term)
        {
            var query = dbContext.Employees.AsQueryable();
            
            if (!string.IsNullOrEmpty(term))
            {
                query = query.Where(r => r.FirstName.StartsWith(term, true , null) 
                || r.LastName.StartsWith(term, true , null));
            }

            return Ok(query.ToList());
        }


        [HttpGet("{id?}")]
        public IActionResult Get(int? id)
        {
            var query = dbContext.Employees.Include(r => r.Department);
            if (id.HasValue)
            {
                var employee = query.SingleOrDefault(r => r.Id == id);
                if (employee == null)
                    return NotFound();

                return Ok(employee);
            }


            return Ok(query.ToList());
        }

        [HttpPost]
        public IActionResult Post([FromBody]Employee employeeDto)
        {
            if (employeeDto == null) return BadRequest();
            var employee = dbContext.Employees.Find(employeeDto.Id);

            if (employee == null)
            {
                employee = new Employee();
                dbContext.Employees.Add(employee);
            }

            employee.FirstName = employeeDto.FirstName;
            employee.LastName = employeeDto.LastName;
            employee.DateOfBirth = employeeDto.DateOfBirth;
            employee.DepartmentId = employeeDto.DepartmentId;


            dbContext.SaveChanges();
            return Ok(employee);

        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var employee = dbContext.Employees.Find(id);
            if (employee == null) return NotFound();

            dbContext.Employees.Remove(employee);
            dbContext.SaveChanges();
            return Ok();
        }
    }
}