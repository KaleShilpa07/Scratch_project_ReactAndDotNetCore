using Microsoft.AspNetCore.Mvc;
using System.Net.Mail;
using System.Net;
using ScratchProject1.Model;

namespace ScratchProject1.Controllers
{
    
    [ApiController]
    public class EmailController : Controller
    {
        [HttpPost]
        [Route("api/SendEmail")]
        public ActionResult SendEmail(EmailModel emailModel)
        {
            try
            {
                MailMessage mail = new MailMessage();
                SmtpClient smtpServer = new SmtpClient("your-smtp-server.com");
                smtpServer.EnableSsl = true;
                mail.From = new MailAddress("your-email@example.com");
                mail.To.Add(emailModel.To);
                mail.Subject = emailModel.Subject;
                mail.Body = emailModel.Body;

                smtpServer.Port = 587;
                smtpServer.Credentials = new NetworkCredential("your-email@example.com", "your-email-password");
                smtpServer.EnableSsl = true;

                smtpServer.Send(mail);

                return Ok("Email sent successfully!");
            }
            catch (Exception ex)
            {
                return Ok(ex);
            }
        }
    }
}
