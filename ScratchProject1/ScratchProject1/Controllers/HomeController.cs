//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using ScratchProject1;
//using ScratchProject1.Model;
//using System.Net.Mail;
//using System.Net;

//namespace ScratchProject1.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class HomeController : ControllerBase
//    {
//        private readonly ComponyContext _cc;
//        public HomeController(ComponyContext cc)
//        {
//            _cc = cc;
//        }


//        [HttpPost]

//        public ActionResult SendEmail(EmailModel emailModel)
//        {
//            try
//            {
//                MailMessage mail = new MailMessage();
//                SmtpClient smtpServer = new SmtpClient("your-smtp-server.com");

//                mail.From = new MailAddress("your-email@example.com");
//                mail.To.Add(emailModel.To);
//                mail.Subject = emailModel.Subject;
//                mail.Body = emailModel.Body;

//                smtpServer.Port = 587;
//                smtpServer.Credentials = new NetworkCredential("your-email@example.com", "your-email-password");
//                smtpServer.EnableSsl = true;

//                smtpServer.Send(mail);

//                return Ok("Email sent successfully!");
//            }
//            catch (Exception ex)
//            {
//                return Ok(ex);
//            }
//        }

//        [HttpGet]

//        public async Task<ActionResult<IEnumerable<Student>>> GetStudent()
//        {
//            if (_cc.Students == null)
//            {
//                return NotFound();
//            }
//            return await _cc.Students.ToListAsync();
//        }
//        [HttpGet("{id}")]

//        public async Task<ActionResult<Student>> GetStudent(int? id)
//        {
//            if (_cc.Students == null)
//            { return NotFound(); }

//            var student = await _cc.Students.FindAsync(id);
//            if (student == null)
//            {
//                return NotFound();
//            }
//            return student;
//        }

//        [HttpPost]
//        public async Task<ActionResult<IEnumerable<Student>>> AddStudent(Student student)
//        {
//            try
//            {

//                // Convert base64 string to byte array and set the Photo property
//                if (!string.IsNullOrEmpty(student.PhotoBase64))
//                {
//                    student.Photo = Convert.FromBase64String(student.PhotoBase64);
//                }

//                _cc.Students.Add(student);
//                await _cc.SaveChangesAsync();
//            }
//            catch (DbUpdateConcurrencyException ex)
//            {
//                Console.WriteLine($"Concurrency Exception: {ex.Message}");
//                throw;
//            }
//            return Ok();
//        }

//        [HttpPut("{id}")]
//        public async Task<ActionResult<IEnumerable<Student>>> EditStudent(int id, Student ss)
//        {
//            if (id != ss.StudentId)
//            {
//                return BadRequest();
//            }

//            // Convert base64 string to byte array and set the Photo property
//            if (!string.IsNullOrEmpty(ss.PhotoBase64))
//            {
//                ss.Photo = Convert.FromBase64String(ss.PhotoBase64);
//            }

//            _cc.Entry(ss).State = EntityState.Modified;
//            try
//            {
//                await _cc.SaveChangesAsync();
//            }
//            catch (DbUpdateConcurrencyException)
//            {
//                throw;
//            }
//            return Ok();
//        }
//        [HttpDelete("deleteMultiple")]
//        public async Task<IActionResult> DeleteMultiple([FromBody] List<int> ids)
//        {
//            var itemsToDelete = await _cc.Students.Where(i => ids.Contains(i.StudentId)).ToListAsync();

//            if (itemsToDelete == null || itemsToDelete.Count == 0)
//            {
//                return NotFound();
//            }

//            _cc.Students.RemoveRange(itemsToDelete);
//            await
//                _cc.SaveChangesAsync();

//            return Ok();
//        }


//        [HttpDelete("{id}")]
//        public async Task<ActionResult<IEnumerable<Student>>> DeleteStudent(int id)
//        {
//            if (_cc.Students == null)
//            {
//                return NotFound();
//            }
//            var stud = await _cc.Students.FindAsync(id);
//            if (stud == null)
//            {
//                return NotFound();
//            }
//            _cc.Students.Remove(stud);
//            await _cc.SaveChangesAsync();
//            return Ok();
//        }


//        [HttpGet("search")]
//        public IActionResult SearchStudents(string searchTerm)
//        {
//            var filteredStudents = _cc.Students
//                .Where(s => s.Name.Contains(searchTerm) || s.Standard.Contains(searchTerm) || s.Age.Contains(searchTerm) || s.City.Contains(searchTerm) || s.MobileNo.Contains(searchTerm) || s.Gender.Contains(searchTerm) || s.EmailId.Contains(searchTerm))
//                .ToList();

//            return Ok(filteredStudents);
//        }
//    }

//}

