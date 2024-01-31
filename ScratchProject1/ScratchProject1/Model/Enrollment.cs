using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ScratchProject1.Model
{
    [Table("EnrollmentTBL")]
    public class Enrollment
    {
        [Key]
        public int EnrollmentId { get; set; }

        [Required]
        //student id
        public int Id { get; set; }

        [Required]
        public int CourseId { get; set; }

        [Required]
        public DateTime EnrollmentDate { get; set; }

        // Navigation properties
        [ForeignKey("Id")]
        public virtual Student Student { get; set; }

        [ForeignKey("CourseId")]
        public virtual Course Course { get; set; }

        public virtual ICollection<Grade> Grades { get; set; }

      



    }
}