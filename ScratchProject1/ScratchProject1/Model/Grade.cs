using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ScratchProject1.Model
{
    [Table("GradeTBL")]
    public class Grade
    {
        [Key]
        public int GradeId { get; set; }

        [Required]
        public int EnrollmentId { get; set; }

        [Required]
        public string GradeValue { get; set; }

        // Navigation property
        [ForeignKey("EnrollmentId")]
        public virtual Enrollment Enrollment { get; set; }
    }
}