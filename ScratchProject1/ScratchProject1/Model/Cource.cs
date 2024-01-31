using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using ScratchProject1.Model;

[Table("CourseTBL")]
public class Course
{
    [Key]
    public int CourseId { get; set; }

    [Required]
    public string? CourseName { get; set; }

    [Required]
    public string? CourseCode { get; set; }

    [Required]
    public int Credits { get; set; }
    public virtual ICollection<Enrollment> Enrollments { get; set; }

}
