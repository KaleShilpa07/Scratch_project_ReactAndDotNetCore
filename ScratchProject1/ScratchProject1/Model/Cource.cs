using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using ScratchProject1.Model;

[Table("CourseTBL")]
public class Course
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int CourseId { get; set; }
    public string? CourseName { get; set; }
    public string? CourseCode { get; set; }
    public string? Grade { get; set; }
    public int Credits { get; set; }

    // Navigation properties
    public virtual ICollection<Enrollment>? Enrollments { get; set; }


}