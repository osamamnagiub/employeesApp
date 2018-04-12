using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Workplace.Models;

namespace Workplace.Controllers
{
    [Route("/api/departments")]
    public class DepartmentsController : Controller
    {
        private readonly EmployeesDbContext dbContext;

        public DepartmentsController(EmployeesDbContext dbContext)
        {
            this.dbContext = dbContext;

        }

        [HttpGet]
        public IActionResult Get()
        {
            var query = dbContext.Departments.ToList();
            return Ok(query);
        }

        [HttpPost]
        public IActionResult Post([FromBody]Department departmentDto)
        {

            if (departmentDto == null)
            {
                return BadRequest();
            }

            Department newDepartment = new Department();
            newDepartment.Name = departmentDto.Name;

            dbContext.Departments.Add(newDepartment);
            dbContext.SaveChanges();
            return Ok(newDepartment);

        }

    }
}