using Microsoft.AspNetCore.Mvc;
using ScratchProject1;
using static ScratchProject1.ComponyContext;
using ScratchProject1.Infrastructure.Irepository;

[Route("api/[controller]")]
[ApiController]
public class StudentController : ControllerBase
{
    private readonly IStudentrepo _studentRepository;
    private readonly ComponyContext _cc;


    public StudentController(IStudentrepo studentRepository, ComponyContext cc)
    {
        _studentRepository = studentRepository;
        _cc = cc;

    }

    [HttpGet]
    public async Task<IActionResult> GetAllStudents()
    {
        try
        {
            var Students = await _studentRepository.GetAllStudentss();
            return Ok(Students);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }


    [HttpGet("{studentid}")]
    public async Task<ActionResult<StudentDetailsDTO>> GetStudentById(int studentid)
    {
        try
        {
            var student = await _studentRepository.GetStudentById(studentid);

            if (student == null)
            {
                return NotFound($"Student with ID {studentid} not found.");
            }

            return Ok(student);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal Server Error: {ex.Message}");
        }
    }



    [HttpPost("AddStudent")]
    public async Task<ActionResult<int>> AddStudent([FromBody] StudentDetailsDTO studentDetails)
    {
        try
        {
            var result = await _studentRepository.AddStudents(studentDetails);

            if (result > 0)
            {
                return Ok("Student added successfully.");
            }

            return BadRequest("Failed to add student.");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal Server Error: {ex.Message}");
        }
    } 

    [HttpPut("{studentid}")]
    public async Task<ActionResult> EditStudent(int studentid, [FromBody] StudentDetailsDTO studentDetails)
    {
        try
        {
            //// Ensure the ID in the DTO matches the route parameter
            if (studentid != studentDetails.StudentId)
            {
                return BadRequest();
            }

            var result = await _studentRepository.EditStudent(studentid, studentDetails);

            if (result)
            {
                return Ok($"Student with ID {studentid} updated successfully.");
            }

            return NotFound($"Student with ID {studentid} not found.");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal Server Error: {ex.Message}");
        }
    }

    [HttpDelete("{studentid}")]
    public async Task<IActionResult> deletestudent(int studentid)
    {
        try
        {
            var result = await _studentRepository.DeleteStudent(studentid);

            if (result > 0)
            {
                return Ok($"student with id {studentid} deleted successfully.");
            }

            return NotFound($"student with id {studentid} not found.");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"internal server error: {ex.Message}");
        }
    }

    [HttpDelete("deleteMultiple")]
    public async Task<IActionResult> DeleteMultiple([FromBody] List<int> ids)
    {
        try
        {
            int deletedCount = await _studentRepository.DeleteMultiple(ids);

            if (deletedCount == 0)
            {
                return NotFound("No items found or deleted.");
            }

            return Ok($"Successfully deleted {deletedCount} item(s).");
        }
        catch (Exception ex)
        {
            // Log the exception or handle it accordingly
            return StatusCode(500, "Internal Server Error");
        }
 
    }


    [HttpGet("search")]
    public IActionResult SearchStudents(string searchterm)
    {
        var filteredStudents = _studentRepository.SearchStudents(searchterm);
        return Ok(filteredStudents);
    }
}
